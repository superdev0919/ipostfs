<?php

namespace App\Http\Controllers;

use Auth;
use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class JWTController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Register user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $response = ['result' => false];

        $input = $request->all();

        //validate the input
        $validator = Validator::make($input, User::$validationRules['signup']);
        if ($validator->fails()) {
            $response['error'] = $validator->errors();
        } else {
            $input['password'] = Hash::make($input['password']);
            $input['role'] = "user";
            try {
                $user = User::create($input);

                // Get the token
                $token = auth()->login($user);

                $response = [
                    'result' => true,
                    'user' => $user,
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60
                    ]
                ];
            } catch (Exception $e) {
                $response['error'] = 'Something Went Wrong!!';
            }
        }

        return response()->json($response);
    }

    /**
     * login user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $response = ['result' => false];
        $credentials = request(['email', 'password']);

        //validate the input
        $validator = Validator::make($credentials, User::$validationRules['login']);
        if ($validator->fails()) {
            $response['error'] = $validator->errors();
        } else {
            if (!$token = auth()->attempt($credentials)) {
                $response['error'] = ['incorrect'=>["Incorrect user name or password."]];
                return response()->json($response);
            } else {
                $user = User::where('email', $request->email)->first();
                $response = [
                    'result' => true,
                    'user' => $user,
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60
                    ]
                ];
            }
        }

        return response()->json($response);
    }

    /**
     * Logout user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['result' => true, 'message' => 'Successfully logged out']);
    }

    /**
     * Refresh token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $response = ['result' => false];
        $token = auth()->refresh();

        if ($token) {
            $response = [
                'result' => true,
                'token' => [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ]
            ];
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json($response);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me() {
        $response = ['result' => false];
        $user = auth()->user();

        if ($user) {
            $response['result'] = true;
            $response['user'] = $user;
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json($response);
    }

    /**
     * Get user profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile(Request $request)
    {
        $response = ['result' => false];

        $input = $request->all();
        $originUser = auth()->user();
        //validate the input
        if($input['email']==$originUser->email)
            $validator = Validator::make($input, User::$validationRules['profile']);
        else
            $validator = Validator::make($input, User::$validationRules['signup']);
        
        if ($validator->fails()) {
            $response['error'] = $validator->errors();
        } else {
            $input['password'] = Hash::make($input['password']);
            try {
                $user = User::find($originUser->id);
                $user->name = $input['name'];
                $user->email = $input['email'];
                $user->password = $input['password'];
                $user->update();

                // Get the token
                $token = auth()->login($user);

                $response = [
                    'result' => true,
                    'user' => $user,
                    'token' => [
                        'access_token' => $token,
                        'token_type' => 'bearer',
                        'expires_in' => auth()->factory()->getTTL() * 60
                    ]
                ];
            } catch (Exception $e) {
                $response['error'] = 'Something Went Wrong!!';
            }
        }

        return response()->json($response);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}