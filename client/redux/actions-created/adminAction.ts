import { AdminActionTypes } from "../constants/adminTypes";
import { Dispatch } from "react";
import axios from "axios";
import buildClient from "../../api/buildClient";
import { AllUsersAction, GetAllProductsAction } from "../action-models/index";
import { UserAuthData } from "../../models/user";
import { RootState } from "../reducers/reducers";
import { ProductTypes } from "../constants";

export const getAllUsers =
  (req: any) => async (dispatch: Dispatch<AllUsersAction>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await buildClient(req).get<UserAuthData[]>(
        "/api/admin/allusers",
        config
      );

      dispatch({
        type: AdminActionTypes.ALL_USERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: AdminActionTypes.ALL_USERS_FAIL,
        payload: error.response.data,
      });
    }
  };

export const blockUser =
  (req: any, id: string) => async (dispatch: Dispatch<any>, getState: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).patch(
        `/api/admin/block/${id}/`,
        config
      );

      const user = getState().allUsers.users.find((el: any) => {
        return el.id === id;
      });

      user.isBlocked = !user.isBlocked;

      console.log(getState().allUsers.users);

      dispatch({
        type: AdminActionTypes.ALL_USERS_SUCCESS,
        payload: getState().allUsers.users,
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };

export const deleteProduct =
  (req: any, id: string) =>
  async (dispatch: Dispatch<GetAllProductsAction>, getState: any) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await buildClient(req).delete(
        `/api/admin/product/${id}/`,
        config
      );

      console.log(getState().allProducts);

      const products = getState().allProducts.products.filter((el: any) => {
        return el.id !== id;
      });

      console.log(products);
      

      dispatch({
        type: ProductTypes.ALL_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };
