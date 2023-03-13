<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use App\Models\PublishDataLimit;
use Illuminate\Http\Request;

class UploadDataController extends Controller
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
    public function addMediaFile(Request $request)
    {
        $response = ['result' => false];
        $user = auth()->user();

        $file = $request->data;

        $fileName = 'media-' . time() . '-' . $file->getClientOriginalName();
        $fileSize = $file->getSize();
        
        $publish_data_limit = PublishDataLimit::where('user_id', $user->id)->get();
        if ($publish_data_limit->count() == 0) {
            $size_limit = 10240000;
            try {
                $publish_data_limit = new PublishDataLimit;
                $publish_data_limit->user_id = $user->id;
                $publish_data_limit->publish_data_size = $fileSize;
                if ($publish_data_limit->publish_data_size <= $size_limit) {
                    $file->move('upload', $fileName);
                    $publish_data_limit->save();

                    $response = [
                        'result' => true,
                        'data' => $fileName,
                    ];
                } else {
                    $response['error'] = ['size_limit'=>["The size of the publishments is over than the limit."]];
                }
            } catch (Exception $e) {
                $response['error'] = 'Something Went Wrong!!';
            }
        } else {
            try {
                $publish_data_limit[0]->publish_data_size += $fileSize;
                if ($publish_data_limit[0]->publish_data_size <= $publish_data_limit[0]->publish_data_size_limit){
                    $file->move('upload', $fileName);
                    $publish_data_limit[0]->save();

                    $response = [
                        'result' => true,
                        'data' => $fileName,
                    ];
                } else {
                    $response['error'] = ['size_limit'=>["The size of the publishments is over than the limit."]];
                }
            } catch (Exception $e) {
                $response['error'] = 'Something Went Wrong!!';
            }
        }
        
        return response()->json($response);
    }
}