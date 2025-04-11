import React, { useState } from "react";
import { useFormik } from "formik";
import { invoiceSchema } from "../../utils/schema";
import { notify } from "../../utils/utils";
import { BsBuildings } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { LiaComments } from "react-icons/lia";
import DetailCard from "../detailCard/DetailCard";

const InvoiceForm = ({ onSubmit, isSubmitting, formData }) => {
  const [activeTab, setActiveTab] = useState("Vendor Details");

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  } = useFormik({
    initialValues: {
      vendor: "",
      poNumber: "",
      invoiceNumber: "",
      invoiceDate: "",
      totalAmount: "",
      paymentTerms: "",
      invoiceDueDate: "",
      glPostDate: "",
      invoiceDescription: "",
      lineAmount: "",
      department: "",
      account: "",
      location: "",
      expenseDescription: "",
      comments: "",
    },
    enableReinitialize: true,
    validationSchema: invoiceSchema,
    onSubmit: (values) => {
      onSubmit(values);
      notify("Invoice submitted successfully!", "success");
      resetForm();
    },
  });

  const renderTabs = () => (
    <div className="flex space-x-4 mb-6 border-b pb-2">
      {["Vendor Details", "Invoice Details", "Comments"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-t-md font-medium ${activeTab === tab
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const renderFormFields = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
          <BsBuildings className="text-blue-600 text-2xl" />
          <span>Vendor Details</span>
        </div>

        <h1 className="text-lg font-medium text-gray-700 mb-2">Vendor Information</h1>

        {/* Label */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vendor <span className="text-red-500">*</span>
        </label>

        {/* Select dropdown */}
        <select
          name="vendor"
          value={values.vendor}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200/50"
        >
          <option value="">Select Vendor</option>
          <option value="Vendor A">Vendor A</option>
          <option value="Vendor B">Vendor B</option>
        </select>

        {/* Error */}
        {touched.vendor && errors.vendor && (
          <p className="mt-1 text-xs text-red-500">{errors.vendor}</p>
        )}

        {/* Address */}
        <p className="mt-2 text-sm text-gray-500">550 Main St., Lynn</p>

        {/* View Details Link */}
        <button
          type="button"
          className="mt-2 flex items-center text-sm text-blue-600 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          View Vendor Details
        </button>
      </div>


      {/* PO Number */}
      <div className="mb-6">

        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
          <CiBookmark className="text-blue-600 text-2xl" />
          <span>Invoice Details</span>
        </div>

        <h1 className="text-lg font-medium text-gray-700 mb-2">General Information</h1>
        <label className="block text-sm font-medium">PO Number</label>
        <select
          name="poNumber"
          value={values.poNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 block w-full border rounded-md p-2"
        >
          <option value="">Select PO</option>
          <option value="PO123">PO123</option>
          <option value="PO456">PO456</option>
        </select>
        {touched.poNumber && errors.poNumber && (
          <p className="text-red-500 text-xs">{errors.poNumber}</p>
        )}
      </div>

      {/* Invoice Detail */}
      <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
        <span>Invoice Details</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Details Header */}


        {/* Invoice Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Invoice Number</label>
          <select
            name="invoiceNumber"
            value={values.invoiceNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">Select Invoice</option>
            <option value="INV001">INV001</option>
            <option value="INV002">INV002</option>
          </select>
          {touched.invoiceNumber && errors.invoiceNumber && (
            <p className="text-red-500 text-xs">{errors.invoiceNumber}</p>
          )}
        </div>

        {/* Invoice Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={values.invoiceDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {touched.invoiceDate && errors.invoiceDate && (
            <p className="text-red-500 text-xs">{errors.invoiceDate}</p>
          )}
        </div>

        {/* Total Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={values.totalAmount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {touched.totalAmount && errors.totalAmount && (
            <p className="text-red-500 text-xs">{errors.totalAmount}</p>
          )}
        </div>

        {/* Payment Terms */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Payment Terms</label>
          <select
            name="paymentTerms"
            value={values.paymentTerms}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          >
            <option value="">Select Terms</option>
            <option value="Net 30">Net 30</option>
            <option value="Net 60">Net 60</option>
          </select>
          {touched.paymentTerms && errors.paymentTerms && (
            <p className="text-red-500 text-xs">{errors.paymentTerms}</p>
          )}
        </div>

        {/* Invoice Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Invoice Due Date</label>
          <input
            type="date"
            name="invoiceDueDate"
            value={values.invoiceDueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {touched.invoiceDueDate && errors.invoiceDueDate && (
            <p className="text-red-500 text-xs">{errors.invoiceDueDate}</p>
          )}
        </div>

        {/* GL Post Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium">GL Post Date</label>
          <input
            type="date"
            name="glPostDate"
            value={values.glPostDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {touched.glPostDate && errors.glPostDate && (
            <p className="text-red-500 text-xs">{errors.glPostDate}</p>
          )}
        </div>

        {/* Invoice Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Invoice Description</label>
          <input
            type="text"
            name="invoiceDescription"
            value={values.invoiceDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
      </div>


      {/* Line Amount */}
      <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
        <span>Expense Details</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="mb-4">
          <label className="block text-sm font-medium">Line Amount</label>
          <input
            type="number"
            name="lineAmount"
            value={values.lineAmount}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={values.department}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Account */}
        <div>
          <label className="block text-sm font-medium">Account</label>
          <input
            type="text"
            name="account"
            value={values.account}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        {/* Expense Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Expense Description</label>
          <input
            type="text"
            name="expenseDescription"
            value={values.expenseDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>
      </div>

      {/* Comments */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800">
          <LiaComments className="text-blue-600 text-2xl" />
          <span>Comments</span>
        </div>
        <label className="block text-sm font-medium">Comments</label>
        <textarea
          name="comments"
          value={values.comments}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={3}
          className="mt-1 block w-full border rounded-md p-2"
        />
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "SubmitInvoice"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {renderTabs()}

      {activeTab === "Vendor Details" ? (
        renderFormFields()
      ) : activeTab === "Invoice Details" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <h2 className="col-span-full text-2xl font-semibold text-gray-700 mb-2">Invoice Details</h2>

          <DetailCard
          label="Invoice Number" value={formData.invoiceNumber} />
          <DetailCard label="Invoice Date" value={formData.invoiceDate} />
          <DetailCard label="Total Amount" value={formData.totalAmount} />
          <DetailCard label="Payment Terms" value={formData.paymentTerms} />
          <DetailCard label="Invoice Due Date" value={formData.invoiceDueDate} />
          <DetailCard label="GL Post Date" value={formData.glPostDate} />
          <DetailCard label="Invoice Description" value={formData.invoiceDescription} />
          <DetailCard label="Line Amount" value={formData.lineAmount} />
          <DetailCard label="Department" value={formData.department} />
          <DetailCard label="Account" value={formData.account} />
          <DetailCard label="Location" value={formData.location} />
          <DetailCard label="Expense Description" value={formData.expenseDescription} />
        </div>
      ) : activeTab === "Comments" ? (
        <div className="bg-white rounded-lg shadow p-4 text-gray-800">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Comments</h2>
          <p className="whitespace-pre-line">{formData.comments || "No comments available."}</p>
        </div>
      ) : (
        <div className="text-gray-600 italic">
          No fields here. All data is in "Vendor Details" tab.
        </div>
      )}


    </div>
  );
};

export default InvoiceForm;

