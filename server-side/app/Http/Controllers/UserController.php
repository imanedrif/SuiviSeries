<?php

namespace App\Http\Controllers;

use App\Models\Episode;
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
        $series = $user->series;
        return response()->json([
            'success' => true,
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
    public function toggleSerieInFavorites(Request $request)
    {
        $user = $request->user();
        $user->series()->toggle($request->serie_id);
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
