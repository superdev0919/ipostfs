<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublishDataLimit extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    // protected $table = 'publishdatas';

    protected $fillable = [
        'user_id', 'publish_data_size', 'publish_data_size_limit' 
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
}