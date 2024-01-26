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
            ['tmdb_series_id' => $serieId],
            ['title' => $request->title, 'image' => $request->image, 'overview' => $request->overview]
        );

        // Toggle the series in favorites
        $user->favorites()->toggle($serie->id);
        return response()->json([
            'success' => true,
            'message' => 'Serie toggled in favorites'
        ]);
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
