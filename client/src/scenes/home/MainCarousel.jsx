import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // css for MainCarousel
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// imports all images from assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    // Remove "./" from the item path and assign it as the key in the accumulator object
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

// Import all hero textures (images) using the importAll function and the require context
const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); // if screen size is above 600px, isNonMobile will be set to 'true', and vice versa for 'false'
  return (
    <Carousel
      infiniteLoop
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay
      interval={5000}
      // Custom rendering of the previous arrow button
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      // Custom rendering of the next arrow button
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {/* Iterate over each hero texture and render a carousel slide */}
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            alt={`carousel-${index}`}
            src={texture}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover", // important for the image to be responsive
              backgroundAttachment: "fixed",
            }}
          />
          {/* TEXT CONTAINER */}
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            // Position the text container based on screen size
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline " }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
