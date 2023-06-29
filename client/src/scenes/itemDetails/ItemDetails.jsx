import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams(); // Extract the itemId from URL parameters set from routes
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1); // how many we want to add in the cart
  const [item, setItem] = useState(null); // data taken from the database using itemId
  const [items, setItems] = useState([]); // related products array

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image", // '?populate=image' gets images from each of the items along with the items data
      { method: "GET" }
    );
    const itemsJson = await items.json();
    console.log(
      "🚀 ~ file: ItemDetails.jsx:39 ~ getItems ~ itemsJson:",
      itemsJson
    );
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box width="80%" m="80px auto">
        {/* TOP SECTION */}
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* IMAGE */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              width="100%"
              height="100%"
              style={{
                objectFit: "contain", // helps with responsiveness of the img
              }}
            />
          </Box>

          {/* ACTIONS */}
          <Box flex="1 1 50%" mb="40px">
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Item</Box>
              <Box>Prev Next</Box>
            </Box>

            <Box m="60px 0 25px 0">
              <Typography variant="h3">{item?.attributes?.name}</Typography>
              <Typography>${item?.attributes?.price}</Typography>
              <Typography sx={{ mt: "20px" }}>
                {item?.attributes?.longDescription}
              </Typography>
            </Box>

            {/* COUNT AND BUTTON */}
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                <IconButton
                  onClick={() => setCount(Math.max(count - 1, 1))} // Decreases the count by 1, ensuring it doesn't go below 1
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                ADD TO CART
              </Button>
            </Box>

            {/* FAVOURITE AND CATEGORY */}
            <Box>
              <Box m="20px 0 5px 0" display="flex">
                {/* no favouriting functionality yet */}
                <FavoriteBorderOutlinedIcon />
                <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
              </Box>
              <Typography>
                CATEGORIES:{" "}
                {item?.attributes?.category
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  // correctly formats category string  
                }
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* INFORMATION SECTION */}
        <Box m="20px 0">
          {/* Tabs for switching between description and reviews */}
          <Tabs value={value} onChange={handleChange}>
            <Tab label="DESCRIPTION" value="description" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {/* Placeholder for reviews (no review functionality yet) */}
          {value === "reviews" && (
            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis voluptate praesentium ducimus a nostrum odio cumque nesciunt tenetur nobis quisquam, quaerat aut dolorem expedita dolorum. Accusamus praesentium corporis cumque aut sunt voluptas quasi nobis, officia consequatur, molestiae quidem optio, eius quo rerum odio esse necessitatibus exercitationem facilis reprehenderit laborum explicabo?</div>
          )}
        </Box>

        {/* RELATED ITEMS SECTION */}
        <Box mt="50px" width="100%">
          <Typography variant="h3" fontWeight="bold">
            Related Products
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between"
          >
            {items?.slice(0, 4).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ItemDetails;
