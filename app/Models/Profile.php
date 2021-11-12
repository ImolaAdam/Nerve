<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function profileImage() {

        $imagePath = ($this->image) ? $this->image : 'profile/4J8OMz8f9SWO9iKvyy0esiZdiLPeLDIaMEDR60Eh.jpg';

        return '/storage/' .  $imagePath;
    }

    public function user() {
        
        return $this->belongsTo(User::class);
    }
}
