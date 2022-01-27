<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Apartment;
use App\Models\BookingStatus;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'birth_date', 'status', 'apartment_id'];

    public function apartment(){
        return $this->belongsTo(Apartment::class);
    }
}
