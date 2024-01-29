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
    public function getWatchedEp(Request $request)
    {
        $user = $request->user();
        $episodes = $user->watchedEpisodes()->get();
        return response()->json([
            'success' => true,
            'user' => $user,
            'series' => $episodes
        ]);
    }
    public function getIsFavorite(Request $request, $serieId)
    {
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

        $watchedEpisodeIds = Episode::join('episode_regarde', 'episode_regarde.episode_id', '=', 'episodes.id')
            ->where('episode_regarde.user_id', $user->id)
            ->where('episodes.series_id', $serieId)
            ->pluck('episodes.tmdb_episode_id');

        return response()->json([
            'success' => true,
            'watchedEpisodes' => $watchedEpisodeIds
        ]);
    }



    public function toggleSerieInFavorites(Request $request, $serieId)
    {
        $user = $request->user();

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

        // Use firstOrCreate to either get the existing episode or create a new one
        $episode = Episode::firstOrCreate(
            ['tmdb_episode_id' => $request->tmdb_episode_id, 'series_id' => $request->series_id],
        );


        // Now toggle the watched state
        if ($user->watchedEpisodes()->where('episode_id', $episode->id)->exists()) {
            $user->watchedEpisodes()->detach($episode->id);
            $action = 'removed';
        } else {
            $user->watchedEpisodes()->attach($episode->id);
            $action = 'added';
        }

        return response()->json([
            'action' => $action,
            'success' => true,
            'message' => "Episode has been {$action} from watched episodes.",
            'episode' => $episode,
        ]);
    }


}
