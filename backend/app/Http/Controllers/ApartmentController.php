<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class ApartmentController extends Controller
{

    public function list(Request $request)
    {
        $apartments = Apartment::where('available', '=', true);

        if($request->features){
            $features = explode(",", $request->features);
            $apartments = $apartments->whereHas('features', function ($query) use($features){
                return $query->whereIn('id', $features);
            }, "=", count($features));
            return response()->json($apartments->with('features')->get());
        }

        return response()->json($apartments->with('features')->get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'features' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message'=>$validator->errors()], 500);
        }

        $apartment= Apartment::create([
            'title' =>  $request->title,
            'description' => $request->description,
            'available' => true,
        ]);

        $apartment->features()->sync($request->features);
        return response()->json($apartment);
    }
}
