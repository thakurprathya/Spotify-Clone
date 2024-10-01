import {Error, Loader, SongCard} from '../components';
import {genres} from '../assets/constants';
import {useGetSongsByGenreQuery} from '../redux/services/shazamCore';  //importing our api hook for genre based selection
import { useDispatch, useSelector } from 'react-redux';  //importing redux hooks
import { selectGenreListId } from '../redux/features/playerSlice';

//classes represents tailwind css classes hover over them to understand use
const Discover = () =>{
    const dispatch= useDispatch();  //useful in modifying the state of redux, it will initate the action that we want certain genre and useSelector will fetch it (genre selector comp on main page)
    const {activeSong, isPlaying, genreListId} = useSelector((state)=> state.player);  //selecting player info from entire state, this hook helps in selecting particular functionality of redux refer para in features/playerslice.js
    //api call
    const {data, isFetching, error}= useGetSongsByGenreQuery(genreListId || 'POP', 'IN'); //data: result of apicall, isFetching: tells whether currently fetching or not, error:tells the error
    if(isFetching){ return <Loader title="Loading Songs..."/>; }
    if(error){ return <Error/>; }
    const genreTitle = genres.find(({value}) => value === genreListId)?.title;
    return(
        <div className='flex flex-col'>
           <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
                <select 
                  onChange= {(e)=>{ dispatch(selectGenreListId(e.target.value)) }}
                  value= {genreListId || 'pop'}
                  className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'>
                    {genres.map((genre)=> <option key={genre.value} value={genre.value}>{genre.title}</option> )}
                </select>
           </div>
           <div className='flex flex-wrap sm:justify-start justify-center gap-8'> {/* wrapper for songs fetched using api */}
                {data?.map((song, index)=>(  //used ? as a check if data existed or not
                    <SongCard key={song?.id} song={song} index={index} isPlaying={isPlaying} activeSong={activeSong} data={data} />
                ))}
           </div>
        </div>
    );
};

export default Discover;
