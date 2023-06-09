import axios from 'axios';
import { API_KEY } from '../services/urls';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ComingSoonScreen = () => {
  const [movies, setMovies] = useState([]);
const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        const now = new Date();
        const filteredMovies = response.data.results.filter(movie => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate > now;
        });
        setMovies(filteredMovies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);


  const renderMovie = ({ item }) => {
    return (
      <TouchableOpacity
      onPress={() => navigation.navigate('Details', {id: item.id})}>
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.moviePoster}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieReleaseDate}>Release date: {item.release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };

  return (
<View style={styles.container}>
  <Text style={styles.sectionTitle}>
    Coming Soon
  </Text>
  <FlatList
    data={movies}
    automaticallyAdjustContentInsets={true}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    renderItem={renderMovie}
    keyExtractor={(item) => item.id.toString()}
  />
</View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  moviePoster: {
    width: 80,
    height: 120,
    marginRight: 20,
  },
  movieDetails: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    maxWidth: 200,
  },
  movieReleaseDate: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 10,
  },
  movieOverview: {
    fontSize: 14,
    color: '#ccc',
  },
});


export default ComingSoonScreen;
