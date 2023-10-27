import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const ProductCard = ({
  _id,
  name,
  price,
  description,
  category,
  rating,
  supply,
  stat,
  brand,
  imageUrls,
  discountPercent,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: theme.palette.background.alt }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[200]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color={theme.palette.secondary[400]}>
          {price.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })}
        </Typography>
        <Rating
          value={
            rating.reduce((acc, itm) => (acc += itm.rating), 0) / rating.length
          }
          readOnly
        />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        unmountOnExit
        timeout={"auto"}
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>_id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Sold Units: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductCard;

export const ProductSkeletonCard = () => {
  const theme = useTheme();
  return (
    <>
      <Card
        variant="outlined"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="40%" />
          <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="50%" />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </CardContent>
        <CardActions>
          <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="40%" />
        </CardActions>
      </Card>
    </>
  );
};
