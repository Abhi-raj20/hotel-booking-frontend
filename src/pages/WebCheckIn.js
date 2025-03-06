// import { useState } from "react";
// import { webCheckIn } from "../services/api";
// import { Box, Button, Input, VStack } from "@chakra-ui/react";

// const WebCheckIn = () => {
//   const [members, setMembers] = useState([{ name: "", aadhaarNumber: "", relationship: "" }]);
//   // const toast = useToast();

//   const handleChange = (index, field, value) => {
//     const updatedMembers = [...members];
//     updatedMembers[index][field] = value;
//     setMembers(updatedMembers);
//   };

//   const addMember = () => setMembers([...members, { name: "", aadhaarNumber: "", relationship: "" }]);

//   const handleSubmit = async () => {
//     try {
//       await webCheckIn({ bookingId: "booking-id-placeholder", familyMembers: members });
//       alert({ title: "Check-In Successful!", description: "Your family members are checked in.", status: "success" });
//     } catch (error) {
//       alert({ title: "Error", description: "Check-In failed", status: "error" });
//     }
//   };

//   return (
//     <Box p={6} maxW="500px" mx="auto">
//       <VStack spacing={3}>
//         {members.map((member, index) => (
//           <VStack key={index} spacing={2} borderWidth="1px" p={3} borderRadius="md">
//             <Input placeholder="Name" value={member.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
//             <Input placeholder="Aadhaar Number" value={member.aadhaarNumber} onChange={(e) => handleChange(index, "aadhaarNumber", e.target.value)} />
//             <Input placeholder="Relationship" value={member.relationship} onChange={(e) => handleChange(index, "relationship", e.target.value)} />
//           </VStack>
//         ))}
//         <Button onClick={addMember}>Add Family Member</Button>
//         <Button colorScheme="blue" onClick={handleSubmit}>Submit Check-In</Button>
//       </VStack>
//     </Box>
//   );
// };

// export default WebCheckIn;

import { useState } from "react";
import { webCheckIn } from "../services/api";
import "./WebCheckIn.css";

const WebCheckIn = () => {
  const [members, setMembers] = useState([
    { name: "", aadhaarNumber: "", relationship: "" }
  ]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
    // Clear any previous errors when user starts typing
    setError("");
  };

  const addMember = () => {
    // Limit to max 5 family members
    if (members.length < 5) {
      setMembers([...members, { name: "", aadhaarNumber: "", relationship: "" }]);
    } else {
      setError("Maximum of 5 family members allowed");
    }
  };

  const handleSubmit = async () => {
    // Validate all members have required information
    const isValid = members.every(
      member => member.name && member.aadhaarNumber && member.relationship
    );

    if (!isValid) {
      setError("Please fill in all details for all family members");
      return;
    }

    try {
      await webCheckIn({ 
        bookingId: "booking-id-placeholder", 
        familyMembers: members 
      });
      
      alert("Check-In Successful! Your family members are checked in.");
    } catch (error) {
      console.error(error);
      setError("Check-In failed. Please try again.");
    }
  };

  return (
    <div className="web-check-in-container">
      <div className="check-in-form">
        <h1>Family Check-In</h1>

        {error && <div className="error-message">{error}</div>}

        {members.map((member, index) => (
          <div key={index} className="family-member-card">
            <input
              type="text"
              placeholder="Name"
              value={member.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Aadhaar Number"
              value={member.aadhaarNumber}
              onChange={(e) => handleChange(index, "aadhaarNumber", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Relationship"
              value={member.relationship}
              onChange={(e) => handleChange(index, "relationship", e.target.value)}
              required
            />
          </div>
        ))}

        <div className="form-actions">
          <button 
            className="add-member-button"
            onClick={addMember}
            disabled={members.length >= 5}
          >
            Add Family Member
          </button>
          
          <button 
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit Check-In
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebCheckIn;