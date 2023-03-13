<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\PublishData;
use App\Models\PublishWholeData;
use App\Models\PublishDataLimit;
use Illuminate\Http\Request;

class PublishDataController extends Controller
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
    public function addPublishData(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();
        
        $input = $request->all();

        // Add data for page to DB
        try {
            $PublishData = new PublishData;
            $PublishData->user_id = $user->id;
            $PublishData->publish_data = $input['data'];
            $PublishData->cid = $input['cid'];
            $PublishData->save();

            $content_size = $input['size'];

            // Add data for whole page to DB
            $PublishWholeData = PublishWholeData::where('user_id', $user->id)->get();
            if ($PublishWholeData->count() == 0){
                try {
                    $PublishWholeData = new PublishWholeData;
                    $PublishWholeData->user_id = $user->id;
                    $PublishWholeData->publish_data = $input['data'];
                    $PublishWholeData->save();
                    
                    $response = [
                        'result' => true,
                        'data' => $PublishWholeData->publish_data,
                    ];
                } catch (Exception $e) {
                    $response['error'] = 'Something Went Wrong!!';
                }
            } else {
                try {
                    $PublishWholeData[0]->publish_data = $PublishWholeData[0]->publish_data . $input['data'];
                    $PublishWholeData[0]->save();
        
                    $response = [
                        'result' => true,
                        'data' => $PublishWholeData[0]->publish_data,
                    ];
                } catch (Exception $e) {
                    $response['error'] = ['Something Went Wrong!!'];
                }
            }

            // Add content size to limit table
            $publish_data_limit = PublishDataLimit::where('user_id', $user->id)->get();
            if ($publish_data_limit->count() == 0) {
                try {
                    $publish_data_limit = new PublishDataLimit;
                    $publish_data_limit->user_id = $user->id;
                    $publish_data_limit->publish_data_size = 2 * $content_size;
                    $publish_data_limit->save();
                } catch (Exception $e) {
                    $response['error'] = 'Something Went Wrong!!';
                }
            } else {
                try {
                    $publish_data_limit[0]->publish_data_size += 2 * $content_size;
                    $publish_data_limit[0]->save();
                } catch (Exception $e) {
                    $response['error'] = 'Something Went Wrong!!';
                }
            }
            
        } catch (Exception $e) {
            $response['error'] = ['Something Went Wrong!!'];
        }
        
        return response()->json($response);
    }

    public function addPublishWholeData(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();
        
        $input = $request->all();

            // Add cid for whole page to DB
            $PublishWholeData = PublishWholeData::where('user_id', $user->id)->get();
                try {
                    $PublishWholeData[0]->whole_cid = $input['cid'];
                    $PublishWholeData[0]->save();
        
                    $response = [
                        'result' => true,
                        'data' => $PublishWholeData[0]->cid,
                    ];
                } catch (Exception $e) {
                    $response['error'] = ['Something Went Wrong!!'];
                }
        return response()->json($response);
    }

    public function checkLimit(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();
        
        $input = $request->all();

        // Calc the whole size and get size limit
        $content_size = $input['data'];

        $publish_data_limit = PublishDataLimit::where('user_id', $user->id)->get();
        if ($publish_data_limit->count() == 0) {
            $all_content_size = 2 * $content_size;//
            
            $size_limit = 10240000;

        } else {
            $all_content_size = $publish_data_limit[0] -> publish_data_size + 2 * $content_size;
            
            $size_limit = $publish_data_limit[0]->publish_data_size_limit;
        }

        // check the limit
        if ($all_content_size <= $size_limit) {

            $response = [
                'result' => true,
                'data' => $all_content_size,
            ];
        } else {
            $response['error'] = ['size_limit'=>["The size of the publishments is over the limit."]];
        }

        return response()->json($response);
    }

    /**
     * login user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function login(Request $request)
    // {
    //     $response = ['result' => false];
    //     $credentials = request(['email', 'password']);

    //     //validate the input
    //     $validator = Validator::make($credentials, User::$validationRules['login']);
    //     if ($validator->fails()) {
    //         $response['error'] = $validator->errors();
    //     } else {
    //         if (!$token = auth()->attempt($credentials)) {
    //             return response()->json(['error' => 'Unauthorized'], 401);
    //         } else {
    //             $user = User::where('email', $request->email)->first();
    //             $response = [
    //                 'result' => true,
    //                 'user' => $user,
    //                 'token' => [
    //                     'access_token' => $token,
    //                     'token_type' => 'bearer',
    //                     'expires_in' => auth()->factory()->getTTL() * 60
    //                 ]
    //             ];
    //         }
    //     }

    //     return response()->json($response);
    // }

    // /**
    //  * Get the authenticated User.
    //  *
    //  * @return \Illuminate\Http\JsonResponse
    //  */
    // public function me() {
    //     $response = ['result' => false];
    //     $user = auth()->user();

    //     if ($user) {
    //         $response['result'] = true;
    //         $response['user'] = $user;
    //     } else {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     return response()->json($response);
    // }
}