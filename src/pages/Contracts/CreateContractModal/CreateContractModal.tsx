// import { useState } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../../config/firebase";
// import { useAuth } from "../../../context/AuthContext";
// import { uploadImage } from "../../../services/cloudinaryService";
// import "./CreateContractModal.css";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   onCreated: () => Promise<void>;
// }

// const CreateContractModal = ({ isOpen, onClose, onCreated }: Props) => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     contractType: "",
//     crop: "",
//     quantity: "",
//     price: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     deliveryDate: "",
//     description: "",
//     requirements: "",
//     paymentMethod: "Cash",
//     image: "",
//   });

//   if (!isOpen) return null;
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     try {
//       const imageUrl = await uploadImage(file);

//       setFormData((prev) => ({
//         ...prev,
//         image: imageUrl,
//       }));
//     } catch (error) {
//       console.error(error);
//       alert("Image upload failed.");
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await addDoc(collection(db, "contracts"), {
//         ...formData,
//         quantity: Number(formData.quantity),
//         price: Number(formData.price),
//         creator: {
//           uid: user!.uid,
//           fullName: user!.fullName,
//           email: user!.email,
//           role: user!.role,
//         },
//         applicants: [],
//         selectedApplicant: null,
//         agreementId: null,
//         status: "Open",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       });

//       await onCreated();
//       alert("Contract Created Successfully!");
//       setFormData({
//         title: "",
//         contractType: "",
//         crop: "",
//         quantity: "",
//         price: "",
//         location: "",
//         startDate: "",
//         endDate: "",
//         deliveryDate: "",
//         description: "",
//         requirements: "",
//         paymentMethod: "Cash",
//         image: "",
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-modal-overlay">
//       <div className="create-modal">
//         <h2>Create New Contract</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Reuse your existing form inputs here */}
//           <div className="form-group">
//             <label>Contract Title</label>
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* ... Add the rest of your form fields ... */}

//           <div className="row">
//             <div className="form-group">
//               <label>Contract Type</label>

//               <select
//                 name="contractType"
//                 value={formData.contractType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select</option>
//                 <option value="SELL">Sell Crops</option>
//                 <option value="BUY">Buy Crops</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>Crop</label>

//               <select
//                 name="crop"
//                 value={formData.crop}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Crop</option>
//                 <option>Rice</option>
//                 <option>Corn</option>
//                 <option>Beans</option>
//                 <option>Potato</option>
//                 <option>Groundnut</option>
//                 <option>Tomato</option>
//                 <option>Onion</option>
//               </select>
//             </div>
//           </div>

//           <div className="row">
//             <div className="form-group">
//               <label>Quantity (KG)</label>

//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Price / KG</label>

//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Location</label>

//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>Image</label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="row">
//             <div className="form-group">
//               <label>Start Date</label>

//               <input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>End Date</label>

//               <input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>Delivery Date</label>

//               <input
//                 type="date"
//                 name="deliveryDate"
//                 value={formData.deliveryDate}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Description</label>

//             <textarea
//               rows={4}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Requirements</label>

//             <textarea
//               rows={4}
//               name="requirements"
//               value={formData.requirements}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label>Payment Method</label>

//             <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleChange}
//             >
//               <option>Cash</option>
//               <option>Bank Transfer</option>
//               <option>KBZ Pay</option>
//               <option>Wave Money</option>
//             </select>
//           </div>

//           <div className="modal-buttons">
//             <button type="button" className="cancel-btn" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="create-btn" disabled={loading}>
//               {loading ? "Creating..." : "Create Contract"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateContractModal;

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import { uploadImage } from "../../../services/cloudinaryService";
import * as yup from "yup";
import "./CreateContractModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}

// ==============================
// Yup Validation Schema
// ==============================

const contractSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Contract title is required.")
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Title can only contain letters, numbers, and spaces.",
    )
    .min(3, "Title must be at least 3 characters."),

  contractType: yup.string().required("Contract type is required."),

  crop: yup.string().required("Crop is required."),

  quantity: yup
    .string()
    .required("Quantity is required.")
    .matches(/^[1-9]\d*$/, "Quantity must be a positive whole number."),

  price: yup
    .string()
    .required("Price is required.")
    .matches(/^[1-9]\d*$/, "Price must be a positive whole number."),

  location: yup
    .string()
    .trim()
    .required("Location is required.")
    .matches(/^[A-Za-z0-9\s,.-]+$/, "Location contains invalid characters."),

  startDate: yup.string().required("Start date is required."),

  endDate: yup.string().required("End date is required."),

  deliveryDate: yup.string().required("Delivery date is required."),

  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .min(10, "Description must be at least 10 characters."),

  requirements: yup.string().trim().required("Requirements are required."),

  paymentMethod: yup
    .string()
    .required("Payment method is required.")
    .oneOf(
      ["Cash", "Bank Transfer", "KBZ Pay", "Wave Money"],
      "Invalid payment method.",
    ),

  image: yup.string().optional(),
});

const CreateContractModal = ({ isOpen, onClose, onCreated }: Props) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    contractType: "",
    crop: "",
    quantity: "",
    price: "",
    location: "",
    startDate: "",
    endDate: "",
    deliveryDate: "",
    description: "",
    requirements: "",
    paymentMethod: "Cash",
    image: "",
  });

  if (!isOpen) return null;

  // ==============================
  // Handle Image Upload
  // ==============================

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Handle Input Change
  // ==============================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error when user changes field
    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = {
          ...prev,
        };

        delete updatedErrors[name];

        return updatedErrors;
      });
    }
  };

  // ==============================
  // Handle Submit
  // ==============================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    try {
      // ==============================
      // Yup Validation
      // ==============================

      await contractSchema.validate(formData, {
        abortEarly: false,
      });

      // ==============================
      // Date Validation
      // ==============================

      const startDate = new Date(formData.startDate);

      const endDate = new Date(formData.endDate);

      const deliveryDate = new Date(formData.deliveryDate);

      if (endDate < startDate) {
        setErrors({
          endDate: "End date cannot be before start date.",
        });

        return;
      }

      if (deliveryDate < startDate) {
        setErrors({
          deliveryDate: "Delivery date cannot be before start date.",
        });

        return;
      }

      if (!user) {
        alert("You must be logged in to create a contract.");

        return;
      }

      // ==============================
      // Start Loading
      // ==============================

      setLoading(true);

      // ==============================
      // Create Contract
      // ==============================

      await addDoc(collection(db, "contracts"), {
        ...formData,

        // Convert string to integer
        quantity: parseInt(formData.quantity, 10),

        price: parseInt(formData.price, 10),

        creator: {
          uid: user.uid,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },

        applicants: [],

        selectedApplicant: null,

        agreementId: null,

        status: "Open",

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),
      });

      // ==============================
      // Refresh Contracts
      // ==============================

      await onCreated();

      alert("Contract Created Successfully!");

      // ==============================
      // Reset Form
      // ==============================

      setFormData({
        title: "",
        contractType: "",
        crop: "",
        quantity: "",
        price: "",
        location: "",
        startDate: "",
        endDate: "",
        deliveryDate: "",
        description: "",
        requirements: "",
        paymentMethod: "Cash",
        image: "",
      });

      setErrors({});

      onClose();
    } catch (error) {
      // ==============================
      // Yup Validation Errors
      // ==============================

      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};

        error.inner.forEach((err) => {
          if (err.path && !validationErrors[err.path]) {
            validationErrors[err.path] = err.message;
          }
        });

        setErrors(validationErrors);

        return;
      }

      // ==============================
      // Firebase Error
      // ==============================

      console.error("Error creating contract:", error);

      alert("Something went wrong while creating the contract.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-modal-overlay">
      <div className="create-modal">
        <h2>Create New Contract</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* ================= TITLE ================= */}

          <div className="form-group">
            <label>Contract Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          {/* ================= TYPE + CROP ================= */}

          <div className="row">
            <div className="form-group">
              <label>Contract Type</label>

              <select
                name="contractType"
                value={formData.contractType}
                onChange={handleChange}
              >
                <option value="">Select</option>

                <option value="SELL">Sell Crops</option>

                <option value="BUY">Buy Crops</option>
              </select>

              {errors.contractType && (
                <span className="error-message">{errors.contractType}</span>
              )}
            </div>

            <div className="form-group">
              <label>Crop</label>

              <select name="crop" value={formData.crop} onChange={handleChange}>
                <option value="">Select Crop</option>

                <option value="Rice">Rice</option>

                <option value="Corn">Corn</option>

                <option value="Beans">Beans</option>

                <option value="Potato">Potato</option>

                <option value="Groundnut">Groundnut</option>

                <option value="Tomato">Tomato</option>

                <option value="Onion">Onion</option>
              </select>

              {errors.crop && (
                <span className="error-message">{errors.crop}</span>
              )}
            </div>
          </div>

          {/* ================= QUANTITY + PRICE ================= */}

          <div className="row">
            <div className="form-group">
              <label>Quantity (KG)</label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                step="1"
              />

              {errors.quantity && (
                <span className="error-message">{errors.quantity}</span>
              )}
            </div>

            <div className="form-group">
              <label>Price / KG</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                step="1"
              />

              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>
          </div>

          {/* ================= LOCATION ================= */}

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            {errors.location && (
              <span className="error-message">{errors.location}</span>
            )}
          </div>

          {/* ================= IMAGE ================= */}

          <div className="form-group">
            <label>Image</label>

            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* ================= DATES ================= */}

          <div className="row">
            <div className="form-group">
              <label>Start Date</label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

              {errors.endDate && (
                <span className="error-message">{errors.endDate}</span>
              )}
            </div>

            <div className="form-group">
              <label>Delivery Date</label>

              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
              />

              {errors.deliveryDate && (
                <span className="error-message">{errors.deliveryDate}</span>
              )}
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          {/* ================= REQUIREMENTS ================= */}

          <div className="form-group">
            <label>Requirements</label>

            <textarea
              rows={4}
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
            />

            {errors.requirements && (
              <span className="error-message">{errors.requirements}</span>
            )}
          </div>

          {/* ================= PAYMENT ================= */}

          <div className="form-group">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>

              <option value="Bank Transfer">Bank Transfer</option>

              <option value="KBZ Pay">KBZ Pay</option>

              <option value="Wave Money">Wave Money</option>
            </select>

            {errors.paymentMethod && (
              <span className="error-message">{errors.paymentMethod}</span>
            )}
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="create-btn" disabled={loading}>
              {loading ? "Creating..." : "Create Contract"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContractModal;
