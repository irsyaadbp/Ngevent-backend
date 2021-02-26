import { Response } from "express";
import { getRepository, Like } from "typeorm";
import { Category } from "../entities/category.entity";
import { RequestWithUser } from "../interfaces/auth.interface";
import Controller, {
  AppResponse,
  PaginateResponse,
} from "../interfaces/controller.interface";
import { ParamsQuery } from "../interfaces/params.interface";
import { Pagination } from "../common/pagination";
import { CategoryDto } from "../dto/category.dto";

export default class CategoryController implements Controller<Category> {
  private repository = getRepository(Category);

  public getAll = async (
    req: RequestWithUser,
    res: PaginateResponse<Category>
  ) => {
    try {
      const params: ParamsQuery = req.query;

      const pagination = new Pagination().pagination(params);

      const limit = pagination.limit;
      const page = pagination.page;
      const offset = pagination.offset;
      const sortBy = params.sortBy || "updated_at";
      const orderBy = (params.orderBy || "DESC").toUpperCase();

      const [allCategories, count] = await this.repository.findAndCount({
        where: { category_name: Like("%" + (params.search || "") + "%") },
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
        data: allCategories,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public getById = async (req: RequestWithUser, res: AppResponse<Category>) => {
    try {
      const params: { id?: number } = req.params;

      if (params.id) {
        const category = await this.repository.findOne({ id: params.id });

        if (category?.id) {
          return res.json({
            success: true,
            message: "Success get category",
            data: category,
          });
        } else {
          return res.json({
            success: false,
            message: "category id not found",
            data: undefined,
          });
        }
      } else {
        return res.json({
          success: false,
          message: "category id cant be empty",
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
  public createNew = async (
    req: RequestWithUser,
    res: AppResponse<Category>
  ) => {
    try {
      const data: CategoryDto = req.body;

      if (!(await this.isCategoryExist(data.category_name))) {
        const { id, ...newData } = data;
        // const newCategory = this.repository.create(newData);
        const newCategory = await this.repository.save(newData);

        return res.status(201).json({
          success: false,
          message: "Category created",
          data: newCategory,
        });
      } else {
        return res.json({
          success: false,
          message: "Category already exist",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
  public update = async (req: RequestWithUser, res: AppResponse<Category>) => {
    try {
      const { id, ...data }: CategoryDto = req.body;
      if (id) {
        const category = await this.repository.findOne({
          category_name: data.category_name,
        });

        if (category?.id && category?.id !== id) {
          return res.json({
            success: false,
            message: "Category name already exist",
          });
        }

        const selectedCategory = await this.repository.findOne({
          id,
        });

        if (!selectedCategory?.id) {
          return res.json({
            success: false,
            message: "Category not found",
          });
        }

        const updated = await this.repository.save({
          ...selectedCategory,
          ...data,
        });

        return res.status(200).json({
          success: false,
          message: "Category updated",
          data: updated,
        });
      } else {
        return res.json({
          success: false,
          message: "Category id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  public delete = async (req: RequestWithUser, res: AppResponse<Category>) => {
    try {
      const id = req.body.id;

      if (id) {
        await this.repository.delete(id);
        return res.json({
          success: true,
          message: "Delete category success",
        });
      } else {
        return res.json({
          success: false,
          message: "Category id cant be empty",
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };

  private isCategoryExist = async (value: string) => {
    return (
      (await this.repository.count({ where: { category_name: value } })) !== 0
    );
  };
}
