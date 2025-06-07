import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import {
  DatePicker,
} from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, addDays } from "date-fns";

export default function DeliveryDateStep() {
  const earliestDate = new Date("2025-06-13");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [collectionDate, setCollectionDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Automatically set default collection date when delivery is selected
  const handleDeliveryChange = (newDate: Date | null) => {
    setDeliveryDate(newDate);
    if (newDate) {
      const defaultCollection = addDays(newDate, 7);
      setCollectionDate(defaultCollection);
    } else {
      setCollectionDate(null);
    }
  };

  // Validate collection date is after delivery date
  const handleCollectionChange = (newDate: Date | null) => {
    if (newDate && deliveryDate && newDate <= deliveryDate) {
      setError("Collection date must be after delivery date.");
    } else {
      setError(null);
    }
    setCollectionDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 3 }}>
        <Typography
          variant="h5"
          fontWeight="600"
          gutterBottom
          sx={{ color: "#111827" }}
        >
          Choose Your Delivery & Collection Dates
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          We’ll aim to deliver and collect your skip between 7am and 6pm on the
          selected days.
        </Typography>

        <Alert severity="info" sx={{ my: 2 }}>
          <Typography fontWeight="500">Permit Information</Typography>
          You've selected to place your skip on a public road, which requires a
          council permit. The council needs 5 working days to process permit
          applications.
          <strong> The earliest available date is Friday 13 June.</strong>
        </Alert>

        <Stack spacing={3} mt={2}>
          {/* Delivery Date Picker */}
          <DatePicker
            label="Delivery Date"
            value={deliveryDate}
            onChange={handleDeliveryChange}
            disablePast
            minDate={earliestDate}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />

          {/* Collection Date Picker */}
          <DatePicker
            label="Collection Date"
            value={collectionDate}
            onChange={handleCollectionChange}
            disablePast
            minDate={deliveryDate ? addDays(deliveryDate, 1) : undefined}
            shouldDisableDate={(date) =>
              deliveryDate ? date <= deliveryDate : false
            }
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error || "",
              },
            }}
          />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}