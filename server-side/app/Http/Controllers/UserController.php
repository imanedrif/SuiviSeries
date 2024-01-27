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
    public function getWatched(Request $request)
    {
        $user = $request->user();
        $episodes = $user->episodes;
        return response()->json([
            'success' => true,
            'episodes' => $episodes
        ]);
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

        // Toggle the series in favorites
        // $user->favorites()->toggle($serie->id);
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Serie toggled in favorites'
        // ]);
        // check if the series is already in favorites, if so, remove it and return a message
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

    public function toggleWatchedEpisode(Request $request, Episode $episode)
    {
        $user = $request->user();

        if ($user->watchedEpisodes()->toggle($episode)) {
            return response()->json(['message' => 'Episode marked as watched successfully']);
        } else {
            return response()->json(['message' => 'Episode removed from watched list successfully']);
        }
    }
}
