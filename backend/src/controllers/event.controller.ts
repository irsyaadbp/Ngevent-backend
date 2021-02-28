import {
  Between,
  FindConditions,
  FindOneOptions,
  getRepository,
  Like,
  MoreThan,
  MoreThanOrEqual,
  ObjectLiteral,
} from "typeorm";
import { Pagination } from "../common/pagination";
import { Event } from "../entities/event.entity";
import { RequestWithUser } from "../interfaces/auth.interface";
import Controller, {
  AppResponse,
  PaginateResponse,
} from "../interfaces/controller.interface";
import { ParamsQuery } from "../interfaces/params.interface";
import { EventDto } from "../dto/event.dto";
import Upload from "../common/upload";
import moment from "moment";

export default class EventController implements Controller<Event> {
  private repository = getRepository(Event);

  public getAll = async (
    req: RequestWithUser,
    res: PaginateResponse<Event>
  ) => {
    try {
      const params: ParamsQuery & {
        category_id?: number;
        priceStart?: number;
        priceEnd?: number;
      } = req.query;

      const pagination = new Pagination().pagination(params);

      const limit = pagination.limit;
      const page = pagination.page;
      const offset = pagination.offset;
      const sortBy = params.sortBy || "updated_at";
      const orderBy = (params.orderBy || "DESC").toUpperCase();

      let whereParam:
        | string
        | ObjectLiteral
        | FindConditions<Event>
        | FindConditions<Event>[]
        | undefined = { event_name: Like("%" + (params.search || "") + "%") };

      if (params.category_id) {
        whereParam.category_id = params.category_id;
      }

      if (params.startDate && params.endDate) {
        whereParam = {
          ...whereParam,
          event_date: Between(params.startDate, params.endDate),
        };
      } else {
        whereParam.event_date = MoreThanOrEqual(moment().toISOString());
      }

      if (params.priceStart && params.priceEnd) {
        whereParam = {
          ...whereParam,
          ticket_price: Between(params.priceStart, params.priceEnd),
        };
      }

      const [allEvents, count] = await this.repository.findAndCount({
        where: whereParam,
        relations: ["category"],
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
        data: allEvents,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public getById = async (req: RequestWithUser, res: AppResponse<Event>) => {
    try {
      const params: { id?: number } = req.params;

      if (params.id) {
        const category = await this.repository.findOne(
          {
            id: params.id,
          },
          { relations: ["category"] }
        );

        if (category?.id) {
          return res.json({
            success: true,
            message: "Success get event",
            data: category,
          });
        } else {
          return res.json({
            success: false,
            message: "Event id not found",
            data: undefined,
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Event id cant be empty",
          data: undefined,
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        data: undefined,
      });
    }
  };

  public createNew = async (req: RequestWithUser, res: AppResponse<Event>) => {
    try {
      const data: EventDto = req.body;

      const { id, ...newData } = data;

      try {
        if (req.file) {
          const cloudinary = new Upload();
          const poster = await cloudinary.uploadImage({ file: req.file.path });

          const newEvent = await this.repository.save({
            ...newData,
            poster: poster.url,
          });

          return res.status(201).json({
            success: false,
            message: "Event created",
            data: newEvent,
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Poster can't be empty",
          });
        }
      } catch (errUpload) {
        console.log(errUpload);
        return res.status(400).json({
          success: false,
          message: errUpload.message,
        });
      }
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public update = async (req: RequestWithUser, res: AppResponse<Event>) => {
    try {
      const { id, ...data }: EventDto = req.body;

      if (id) {
        const selectedEvent = await this.repository.findOne({
          id,
        });

        if (!selectedEvent?.id) {
          return res.json({
            success: false,
            message: "Event not found",
          });
        }

        try {
          let poster = selectedEvent.poster;

          if (req.file) {
            const cloudinary = new Upload();
            const uploadPoster = await cloudinary.uploadImage({
              file: req.file.path,
            });

            poster = uploadPoster.url;
          }

          const updated = await this.repository.save({
            ...selectedEvent,
            ...data,
            poster,
          });

          return res.status(200).json({
            success: false,
            message: "Event updated",
            data: updated,
          });
        } catch (errUplod) {
          return res.status(400).json({
            success: false,
            message: errUplod.message,
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Event id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public delete = async (req: RequestWithUser, res: AppResponse<Event>) => {
    try {
      const id = req.body.id;

      if (id) {
        await this.repository.delete(id);
        return res.json({
          success: true,
          message: "Delete event success",
        });
      } else {
        return res.json({
          success: false,
          message: "Event id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
}
