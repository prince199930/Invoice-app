
import * as Yup from "yup";

const SUPPORTED_FORMATS = ["jpg", "jpeg", "png"];
const csvFormat = ["csv"];

const MAX_FILE_SIZE = 2 * 1024 * 1024; //100KB

// Valid formats
const validFileExtensions = {
  image: ["jpg", "png", "jpeg"],
  csvFormat: ["csv"],
  video: ["mp4"],
};

export const signInSchema = Yup.object({
    email: Yup.string()
        .trim("The Email can't include space(s) at start and end")
        .strict(true)
        .required("Please enter Email")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/,
            "Email address is not valid"
        ),

    password: Yup.string()
        .trim("The last name cannot include start and end spaces")
        .strict(true)
        .required("Please enter password")
        .min(3, "Invalid Password"),
});

export const invoiceSchema = Yup.object({
    vendor: Yup.string().required("Vendor is required"),
    poNumber: Yup.string().required("Purchase Order Number is required"),
    invoiceNumber: Yup.string().required("Invoice Number is required"),
    totalAmount: Yup.number().required("Total Amount is required").min(0),
    paymentTerms: Yup.string().required("Payment Terms are required"),
    invoiceDueDate: Yup.string().required("Invoice Due Date is required"),
    glPostDate: Yup.string().required("GL Post Date is required"),
    invoiceDescription: Yup.string().required("Invoice Description is required"),
    lineAmount: Yup.number().required("Line Amount is required").min(0),
    lineAmount: Yup.string().required("Department is required"),
    account: Yup.string().required("Account is required"),
    location: Yup.string().required("Location is required"),
    expenseDescription: Yup.string().required("Description is required"),
  });