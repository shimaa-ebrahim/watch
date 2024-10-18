import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { fetchTrending } from "../services/api"; // Ensure this fetches data correctly
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle any errors
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    const getTrendingData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const res = await fetchTrending(timeWindow);
        setData(res); // Assuming res contains the trending data
      } catch (err) {
        console.log(err);
        setError("Error fetching data. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    getTrendingData();
  }, [timeWindow]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderRadius={"20px"}
        >

          
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("day")}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`}
            onClick={() => setTimeWindow("week")}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {loading ? (
          <Flex justifyContent="center" alignItems="center" height="300px">
            <Spinner size="lg" />
          </Flex>
        ) : error ? (
          <Text color="red.500" textAlign="center">{error}</Text>
        ) : (
          data.map((item) => (
            <CardComponent key={item?.id} item={item} type={item?.media_type} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
