import {
  Between,
  FindConditions,
  getRepository,
  Like,
  ObjectLiteral,
} from "typeorm";
import { Pagination } from "../common/pagination";
import { OrderDto } from "../dto/order.dto";
import { Order, Status } from "../entities/order.entity";
import { RequestWithUser } from "../interfaces/auth.interface";
import Controller, {
  AppResponse,
  PaginateResponse,
} from "../interfaces/controller.interface";
import { ParamsQuery } from "../interfaces/params.interface";
import moment from "moment";
import { Event } from "../entities/event.entity";
import EventController from "./event.controller";

export default class OrderController implements Controller<Order> {
  private repository = getRepository(Order);

  public getAll = async (
    req: RequestWithUser,
    res: PaginateResponse<Order>
  ) => {
    try {
      const params: ParamsQuery & { user_id?: number } = req.query;

      const pagination = new Pagination().pagination(params);

      const limit = pagination.limit;
      const page = pagination.page;
      const offset = pagination.offset;
      const sortBy = params.sortBy || "updated_at";
      const orderBy = (params.orderBy || "DESC").toUpperCase();

      let whereParam:
        | string
        | ObjectLiteral
        | FindConditions<Order>
        | FindConditions<Order>[]
        | undefined = { order_number: Like("%" + (params.search || "") + "%") };

      if (params.user_id) {
        whereParam.user_id = params.user_id;
      }

      if (params.startDate && params.endDate) {
        whereParam = {
          ...whereParam,
          event_date: Between(params.startDate, params.endDate),
        };
      }

      const [allOrder, count] = await this.repository.findAndCount({
        where: whereParam,
        relations: ["event"],
        order: { [sortBy]: orderBy },
        take: limit,
        skip: offset,
      });

      return res.json({
        success: true,
        message: count > 0 ? "Success get all data" : "Data empty",
        count: count,
        currentPage: page,
        perPage: limit,
        allPage: Math.ceil(count / limit),
        data: allOrder,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public getById = async (req: RequestWithUser, res: AppResponse<Order>) => {
    try {
      const params: { id?: number } = req.params;

      if (params.id) {
        const category = await this.repository.findOne(
          { id: params.id },
          { relations: ["user", "event"] }
        );

        if (category?.id) {
          return res.json({
            success: true,
            message: "Success get order",
            data: category,
          });
        } else {
          return res.json({
            success: false,
            message: "Order id not found",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public createNew = async (req: RequestWithUser, res: AppResponse<Order>) => {
    try {
      const { id, ...data }: OrderDto = req.body;

      const orderNumber = moment().format("DDMMYYYY-HHmmss");
      const eventRepository = getRepository(Event);

      const eventById = await eventRepository.findOne({
        id: data.event_id,
      });

      if (eventById?.id) {
        const eventDate = moment(eventById.event_date);
        const today = moment();

        // check event date is valid
        if (eventDate.isAfter(today)) {
          // check tickets if they are still available
          if (eventById.total_ticket - eventById.sold_ticket > 0) {
            if (eventById.ticket_price * data.qty === data.total_price) {
              const newOrder = await this.repository.save({
                ...data,
                order_number: orderNumber,
                user_id: req.user?.id,
                event_date: eventById.event_date,
              });

              await eventRepository.update(
                { id: eventById.id },
                { sold_ticket: eventById.sold_ticket + data.qty }
              );

              return res.json({
                success: true,
                message: "Order created",
                data: newOrder,
              });
            }

            return res.json({
              success: false,
              message: "Total price not valid",
            });
          }

          return res.json({
            success: false,
            message: "Ticket sold out",
          });
        }

        return res.json({
          success: false,
          message: "The event date is no longer valid",
        });
      } else {
        return res.json({
          success: false,
          message: "Event not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public update = async (req: RequestWithUser, res: AppResponse<Order>) => {
    try {
      const { id, ...data }: OrderDto = req.body;
      const selectedOrder = await this.repository.findOne({ id });

      if (!selectedOrder?.id) {
        return res.json({
          success: false,
          message: "Order not found",
        });
      }

      let attended_date = selectedOrder.attended_date;

      if (data.status === Status.ATTENDED) {
        if (selectedOrder.status === Status.BOOKED) {
          attended_date = new Date();
        } else {
          return res.json({
            success: false,
            message: "You already attended",
          });
        }
      }

      const updated = await this.repository.save({
        ...selectedOrder,
        ...data,
        attended_date,
      });

      return res.json({
        success: true,
        message: "Order updated",
        data: updated,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
}
