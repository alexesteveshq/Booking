<?php

namespace App\Listeners;

use App\Events\UpdateAvailabilityEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateAvailabilityListener
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
     * @param  \App\Events\UpdateAvailabilityEvent  $event
     * @return void
     */
    public function handle(UpdateAvailabilityEvent $event)
    {
        //
    }
}
