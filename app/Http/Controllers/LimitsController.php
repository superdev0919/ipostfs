<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\PublishDataLimit;
use Illuminate\Http\Request;

class LimitsController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Register user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLimits(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();

        $input = $request->all();

        try {
            if ($input['user_role'] == 'admin') {
                $user_data = User::join('publish_data_limits', 'publish_data_limits.user_id', '=', 'users.id', 'left')
                    ->select('users.id', 'users.name', 'users.email', 'publish_data_limits.publish_data_size_limit')
                    ->where('role', '!=', 'admin')
                    ->get();
                $response = [
                    'result' => true,
                    'user_data' => $user_data,
                ];
            }
        } catch (Exception $e) {
            $response['error'] = 'Something Went Wrong!!';
        }
        return response()->json($response);
    }

    public function updateLimit(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();

        $input = $request->all();

        try {
            $publish_data_limit = PublishDataLimit::where('user_id', $input['user_id'])->get();
            if ($publish_data_limit->count() == 0) {
                $publish_data_limit = new PublishDataLimit();
                $publish_data_limit->user_id = $input['user_id'];
                $publish_data_limit->publish_data_size_limit = $input['limit'];
                $publish_data_limit->save();                
            } else {
                $publish_data_limit[0]->publish_data_size_limit = $input['limit'];
                $publish_data_limit[0]->save();
            }
            $response = [
                'result' => true,
            ];
        } catch (Exception $e) {
            $response['error'] = 'Something Went Wrong!!';
        }
        return response()->json($response);
    }
}