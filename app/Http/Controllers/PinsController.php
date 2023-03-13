<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\PublishData;
use Illuminate\Http\Request;

class PinsController extends Controller
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
    public function getPins(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();

        $input = $request->all();

        try {
            if ($input['user_role'] == 'admin') {
                $publish_cid = PublishData::select('cid', 'user_id')->get();
                $user_data = User::select('id', 'name', 'email')->where('role', '!=', 'admin')->get();
                $response = [
                    'result' => true,
                    'data' => $publish_cid,
                    'user_data' => $user_data,
                ];
            } else {
                $publish_cid = PublishData::select('cid')->where('user_id', $input['user_id'])->get();
                $response = [
                    'result' => true,
                    'data' => $publish_cid,
                ];
            }
        } catch (Exception $e) {
            $response['error'] = 'Something Went Wrong!!';
        }
        return response()->json($response);
    }

    public function deletePin(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();

        $input = $request->all();

        try {
            $publish_cid = PublishData::where('cid', $input['cid'])->delete();
            $response = [
                'result' => true,
            ];
        } catch (Exception $e) {
            $response['error'] = 'Something Went Wrong!!';
        }
        return response()->json($response);
    }
}