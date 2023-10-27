import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useGetProductsQuery } from "../../services/api";
import Header from "../../components/common/Header";
import ProductCard, {
  ProductSkeletonCard,
} from "../../components/products/ProductCard";
const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isMobile = useMediaQuery("(min-width:360px)");
  const isTablet = useMediaQuery("(min-width:600px)");
  const isDesktop = useMediaQuery("(min-width:1000px)");
  return (
    <>
      <Box  
        flexDirection={"column"}
        m={"1.5rem 2.5rem"}
        //  border={"1px solid"}
      >
        <Header title={"Products"} subtitle={"See your list of products"} />
        {data && !isLoading ? (
          <Grid
            container
            width={"calc(100% + 24px)"}
            height={"calc(100vh - 200px)"}
            flex={1}
            // border={"1px solid"}
            overflow={"scroll"}
            spacing={3}
            mt={"1.5rem"}
          >
            {data.map((itm) => {
              return (
                <Grid
                  // border={"1px solid"}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  // p={"0px !important"}
                >
                  <ProductCard
                    _id={itm._id}
                    name={itm.name}
                    price={itm.price}
                    description={itm.description}
                    category={itm.category}
                    rating={itm.rating}
                    supply={itm.supply}
                    brand={itm.brand}
                    imageUrls={itm.imageUrls}
                    discountPercent={itm.discountPercent}
                    stat={itm.stat}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <>
            <Grid
              container
              width={"calc(100% + 24px)"}
              height={"calc(100vh - 200px)"}
              flex={1}
              // border={"1px solid"}
              overflow={"scroll"}
              spacing={3}
              mt={"1.5rem"}
            >
              {Array.from({ length: 12 }).map(() => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ProductSkeletonCard />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Products;
