<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Apartment;
use App\Models\User;
use App\Events\BookingStatusEvent;
use App\Events\UpdateAvailabilityEvent;
use App\Exceptions\NotAvailableException;
use Illuminate\Support\Facades\Validator;
use Auth;

class BookingController extends Controller
{
    private function apartmentValidate(Request $request)
    { 
        $apartment = Apartment::where('id', '=', $request->apartment_id)->where('available', '=', true)->first();
        if(!$apartment){
            throw new NotAvailableException('This apartment is not available anymore');    
        }
        return $apartment;
    }
    
    private function updateBooking(Request $request)
    {
        $booking = Booking::find($request->booking_id);
        event(new UpdateAvailabilityEvent());

        return $booking;
    }

    public function list()
    {
        return response()->json(Booking::where('status', '=', 'waiting')->with('apartment')->get());
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'birth_date' => 'required|date|before:-18 years',
            'apartment_id' => 'required|integer',
        ],
        [
            'birth_date.before' => 'You must be over 18 years old for booking.',
        ]);  

        if ($validator->fails()) {
            return response()->json(['message'=>$validator->errors()], 500);
        }
        
        $apartment = $this->apartmentValidate($request);
        $booking= new Booking([
            'name' =>  $request->name,
            'birth_date' => $request->birth_date,
        ]);

        $booking->apartment()->associate($apartment);
        $booking->save();
        $unaprovedBookings = Booking::where('status', '=', 'waiting')->get();
        event(new BookingStatusEvent($unaprovedBookings->count()));
        return response()->json($booking);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'apartment_id' => 'required|integer',
            'booking_id' => 'required|integer',
            'status' => 'required|in:approved,rejected',
        ]);
        if ($validator->fails()) {
            return response()->json(['message'=>$validator->errors()], 500);
        }

        if($request->status == 'approved'){
            $apartment = $this->apartmentValidate($request);
            $apartment->update(['available' => false]);
        }
        $booking = $this->updateBooking($request);
        $booking->update(['status' => $request->status]);
        return response()->json($booking);
    }

}
