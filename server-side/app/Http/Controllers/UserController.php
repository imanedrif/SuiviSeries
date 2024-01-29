<?php

namespace App\Http\Controllers;

use App\Models\Episode;
use App\Models\Series;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user' => $user
        ]);
    }
    public function getFavorites(Request $request)
    {
        $user = $request->user();
        $series = $user->favorites()->get();
        return response()->json([
            'success' => true,
            'user' => $user,
            'series' => $series
        ]);
    }
    public function getIsFavorite(Request $request, $serieId)
    {
        // check if the series is in favorites, if so, return true
        $user = $request->user();
        $serie = Series::where('tmdb_series_id', $serieId)->first();
        if ($user->favorites()->where('series_id', $serie->id)->exists()) {
            return response()->json([
                'success' => true,
                'isFavorite' => true
            ]);
        } else {
            return response()->json([
                'success' => true,
                'isFavorite' => false
            ]);
        }
    }
    public function getWatchedEpisodes(Request $request, $serieId)
    {
        $user = $request->user();
        $episode = Episode::where('tmdb_series_id', $serieId)->first();
        if ($user->watchedEpisodes()->where('tmdb_episode_id', $episode->tmdb_episode_id)->exists()) {
            return response()->json([
                'success' => true,
                'isWatched' => true
            ]);
        } else {
            return response()->json([
                'success' => true,
                'isWatched' => false
            ]);
        }
        // $user = $request->user();
        // $serie = Series::where('tmdb_series_id', $serieId)->first();
        // $episodes = $serie->episodes()->get();
        // return response()->json([
        //     'success' => true,
        //     'user' => $user,
        //     'episodes' => $episodes
        // ]);
    }
    public function toggleSerieInFavorites(Request $request, $serieId)
    {
        $user = $request->user();

        // Find the series in the Series table or create a new one
        $serie = Series::firstOrCreate(
            [
                'tmdb_series_id' => $serieId,
                'name' => $request->name,
                'poster_path' => $request->poster_path,
                'overview' => $request->overview,
                'first_air_date' => $request->first_air_date,
                'vote_average' => $request->vote_average
            ]
        );
        if ($user->favorites()->where('series_id', $serie->id)->exists()) {
            $user->favorites()->detach($serie->id);
            return response()->json([
                'action' => 'removed',
                'success' => true,
                'message' => 'Serie removed from favorites',
            ], 200);
        } else {
            // if not, add it and return a message
            $user->favorites()->attach($serie->id);
            return response()->json([
                'action' => 'add',
                'success' => true,
                'message' => 'Serie added to favorites',
                'serie' => $serie,
            ], 201);
        }
    }

    public function toggleWatchedEpisode(Request $request, $episodeId)
    {
        $user = $request->user();

        // Find the episode in the Episode table or create a new one
        $episode = Episode::firstOrCreate(
            [
                'series_id' => $request->series_id,
                'tmdb_episode_id' => $request->tmdb_episode_id,
            ]
        );

        // use WatchedEpisodes pivot table to toggle the episode
        if ($user->watchedEpisodes()->where('episode_id', $episode->id)->exists()) {
            $user->watchedEpisodes()->detach($episode->id);
            return response()->json([
                'action' => 'removed',
                'success' => true,
                'message' => 'Episode removed from watched episodes',
            ], 200);
        } else {
            // if not, add it and return a message
            $user->watchedEpisodes()->attach($episode->id);
            return response()->json([
                'action' => 'add',
                'success' => true,
                'message' => 'Episode added to watched episodes',
                'episode' => $episode,
            ], 201);
        }
    }
}
