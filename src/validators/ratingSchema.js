import * as yup from "yup";

export const ratingSchema = yup.object().shape({
  storeId: yup.number().required("Store is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
  comment: yup.string().max(400, "Max 400 characters"),
});
