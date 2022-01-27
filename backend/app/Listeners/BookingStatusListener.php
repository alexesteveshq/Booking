<?php

namespace App\Listeners;

use App\Events\BookingStatusEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class BookingStatusListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\BookingStatusEvent  $event
     * @return void
     */
    public function handle(BookingStatusEvent $event)
    {
        //
    }
}
