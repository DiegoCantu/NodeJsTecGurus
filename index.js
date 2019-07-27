const axios = require("axios");

const apiCinepolisCities = 'https://www.cinepolis.com/manejadores/CiudadesComplejos.ashx?EsVIP=false';
const apiConepolisMovies = 'https://www.cinepolis.com/Cartelera.aspx/GetNowPlayingByCity';
const apiService = 'http://localhost:3000/api/';
const apiCity = `${apiService}city`;
const apiMovie = `${apiService}movie`;

//Cities

//Retorno Implicito
// const createComplejo = ({Nombre,Clave}) => ({
//         nombre: Nombre,
//         clave: Clave
// })

// Retorno con return
// const createCity = ({Nombre,Clave,GeoX,GeoY,Complejos}) => { 
//     return {
//         complejos: Complejos.map(createComplejo),
//         nombre: Nombre,
//         clave: Clave,
//         geoX: GeoX,
//         geoY: GeoY
//     };
// }


// const processData = (data) => {
//     const ciudades = data.map(createCity);
//     ciudades.forEach(element => {
//         axios.post(apiCity, element);
//     });
// }

// const getCities =  async () => {
//     try {
//         const {
//             data
//         } = await axios.post(apiCinepolisCities);
//         processData(data);
//     } catch (e) {
//         console.log(e);
//     }
// } 

// getCities();
//


// formats: Formats,
//     id: {
//         type:Number,
//         unique: true
//     },
//     title: {
//         type: String,
//         default: "Pelicula",
//         trim: true,
//         required: true
//     },
//     key: String,
//     originalTitle: String,
//     rating: String,
//     ratingDescription: String,
//     runTime: String,
//     poster: String,
//     trailer: String,
//     director: String,
//     actors: [String],
//     gender: String,
//     distributor: String,
//     order: {
//         type:Number
//     }


// Movies

const createShowTimes = ({
    CinemaId,
    VistaCinemaId,
    ShowtimeId,
    TimeFilter,
    Time,
    ShowtimeAMPM
}) => ({
    cinemaId: CinemaId,
    vistaCinemaId: VistaCinemaId,
    showtimeId: ShowtimeId,
    timeFilter: TimeFilter,
    time: Time,
    showtimeAMPM: ShowtimeAMPM
})

const createFormats = (format) => {
    console.log("createFormats");
    console.log(format);
    const {
        Showtimes,
        VistaId,
        Name,
        IsExperience,
        SegobPermission,
        Language
    } = format;
    return { 
        showtimes: Showtimes.map(createShowTimes),
        vistaId: VistaId,
        name: Name,
        isExperience: IsExperience,
        segobPermission: SegobPermission,
        language: Language
    }
}


const createMovie = ({
    Id,
    Title,
    Key,
    OriginalTitle,
    Rating,
    RatingDescription,
    RunTime,
    Poster,
    Trailer,
    Director,
    Actors,
    Gender,
    Distributor,
    Order,
    Formats
}) => {
    console.log("createMovie");
    console.log(Formats);
    return {
        id: Id,
        title: Title,
        key: Key,
        originalTitle: OriginalTitle,
        rating: Rating,
        ratingDescription: RatingDescription,
        runTime: RunTime,
        poster: Poster,
        trailer: Trailer,
        director: Director,
        actors: Actors,
        gender: Gender,
        distributor: Distributor,
        order: Order,
        formats: Formats.map(createFormats) 
    }
};


const processData = (data) => {

    //axios.post(apiMovie, data);
    const movies = data.map(createMovie);
    movies.forEach(element => {
        axios.post(apiMovie, element);
    });
}

const getMovies = async () => {
    try {
        const response = await axios.post(apiConepolisMovies, { claveCiudad: "cdmx-norte", esVIP: false });

        response.data.d.Cinemas.forEach(Cinemas => {
            Cinemas.Dates.forEach(Dates => {
                //Dates.Movies.forEach(Movies => {
                    processData(Dates.Movies);
                //});
            });
        });

    } catch (e) {
        console.log(e);
    }
}

getMovies();


