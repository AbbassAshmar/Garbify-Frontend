import Hoody2 from "../assets/Hoody2.jpg"
import Hoody from "../assets/Hoody.jpg"

import jordan4_1 from "../assets/jordan4redfront.jpg"
import jordan4_2 from "../assets/jordan4redfront2.jpg"
import jordan4_3 from "../assets/jordan4redside2.jpg"
import jordan4_4 from "../assets/jordan4sidered.jpg"
import jordan4_5 from "../assets/jordan4redback.jpg"

import jordan4_6 from "../assets/jordan4greenfront.jpg"
import jordan4_7 from "../assets/jordan4greenfront2.jpg"
import jordan4_8 from "../assets/jordan4greenside2.jpg"
import jordan4_9 from "../assets/jordan4greenback.jpg"
import jordan4_10 from "../assets/jordan4blueside2.jpg"
import jordan4_11 from "../assets/jordan4blueside.jpg"
import jordan4_12 from "../assets/jordan4bluefront.jpg"
import jordan4_13 from "../assets/jordan4blueback.jpg"

// Main title :clamp(1.1rem,3vw,1.5rem);

// Smaller title : clamp(1rem, 2.6vw, 1.3rem);

// smaller : clamp(.8rem , 2.3vw ,1.1rem);

// smaller :clamp(.7rem,2vw,.9rem);

// smaller :clamp(.65rem,1.8vw,.8rem);



// main title (shipping state) : 1.3rem --> 1.1rem (800px)
// name - text in header: 1rem -->.8rem (800px)
// buttons and subtext : .9rem -->.7rem (800px)

// blue : #00C2FF; #00AEE5; #009BCC;
// grey : #F1F4F9; #D8DBE0; #C0C3C7; #A8AAAE;
export const USER = {
    name :"Saddam Hussein",
    email:"KuwaitIsMine@gmail.com",
    profile_picture:Hoody,
};
export const REVIEWS_USERS_PRODUCTS = [
    {
        'id' : 1,
        'user_weight' : '324 kg',
        'user_height' : '234 cm',
        'created_at'  : '2023-02-03',
        'would_buy_again' : false,
        'helpful_count' : 234,
        'product_rating' : 4.5,
        'color' : 'red',
        'size' : 'xl',
        'title' : 'best product ever, the matrial is not that good',
        'text' : 'The matrial is bad , service was ok, the service guy cursed my family buy it not important, why would you hire indians tho?',
        'images' : [
            Hoody2,
            Hoody
        ],
        'user' : {
            'id' : 3,
            'name' : 'User1_dummy',
            'email': 'user1_dummy@gmail.com',
            'profile_picture' : Hoody
        },
        'product' : {
            'thumbnail' : Hoody,
            'id' : 4,
            'name' :  "Shoes with night light",
            'quantity' : 234,
            'price' : 430,
            'type' : 'top notch',
            "colors" : ['red','brown'],
            "created_at": '2023-03-02',
            'reviews_summary':{
                'average_ratings': 4.5,
                'reviews_count' : 345,
            },
            "sale" : {
                'price_after_sale': 215,
                'percentage': 50.00 ,
                'starts_at' :  '2012-02-03',
                'ends_at' :  '2025-05-06',
            }
        }
    },
    {
        'id' : 2,
        'user_weight' : '324 kg',
        'user_height' : '234 cm',
        'created_at'  : '2023-02-03',
        'would_buy_again' : true,
        'helpful_count' : 234,
        'product_rating' : 4.5,
        'color' : 'red',
        'size' : 'xl',
        'title' : 'best product ever, the matrial is not that good',
        'text' : 'The matrial is bad , service was ok, the service guy cursed my family buy it not important, why would you hire indians tho?',
        'images' : [
            Hoody2,
            Hoody
        ],
        'user' : {
            'id' : 3,
            'name' : 'User1_dummy',
            'email': 'user1_dummy@gmail.com',
            'profile_picture' : Hoody
        },
        'product' : {
            'thumbnail' : Hoody,
            'id' : 4,
            'name' :  "Shoes with night light",
            'quantity' : 234,
            'price' : 430,
            'type' : 'top notch',
            "colors" : ['red','brown'],
            "created_at": '2023-03-02',
            'reviews_summary':{
                'average_ratings': 4.5,
                'reviews_count' : 345,
            },
        }
    }
    
]
export const FILTERS =[
    {
        name : "Categories",
        type: "list",
        options:[
            {
                id:4,
                name:"running Shoes",
            },
            {
                id:5,
                name:"High Heals"
            },
            {
                id:6,
                name:"Formal Shoes",
            },
            {
                id:7,
                name:"loafers"
            }
        ]
    },

    {
        name : "color",
        type:"list",
        options:[
            "red",
            "black",
            "blue"
        ]
    },
    {
        name: "price",
        type:"list",
        options:{
            "under 235$" : "0-235",
            "235$ to 270$":"235-270",
            "270$ to 305$":"270-305",
            "over 305$":"305"
        }
    },
    {
        name:"size",
        type:"list",
        options:[
            'xlarge',
            'large',
            'small',
            'medium',
            'xxlarge'
        ]
    }

]
export const FAV_LISTS =[
    {
        id:3,
        name:'Joshs Favourites For this Summer',
        updated_at:"22-09-2022",
        views_count:234,
        likes_count:390,
        thumbnail:Hoody,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },
    {
        id:321,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody,
            name:"josh",
        },
        favorites_count:4

    },
    {
        id:43,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },
    {
        id:13,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },
    {
        id:23,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },
    {
        id:32,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },
    {
        id:30,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    },  
    {
        id:10,
        name:'Joshs Favourites For this Summer',
        views_count:234,
        likes_count:390,
        thumbnail:Hoody2,
        user:{
            id:1,
            profile_picture:Hoody2,
            name:"josh",
        },
        favorites_count:3
    }
]

export const PRODUCTS = [
    {
        id:3,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:100,
            percentage:50,
        },
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    },
    {
        id:4,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:100,
            percentage:50,
        },
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    },
    {
        id:6,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:100,
            percentage:50,
        },
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    },
    {
        id:23,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:100,
            percentage:50,
        }, 
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }

    },
    {
        id:32,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:100,
            percentage:50,
        },
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    },
    {   
        id:435,
        name:"Brooks sport shoes",
        price:150,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    },
    {
        id:43,
        name:"Brooks sport shoes",
        price:240,
        thumbnail:Hoody2,
        quantity:400,
        type:"men shoes",
        sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
        sale:{
            price_after_sale:200,
            percentage:20,
        },
        reviews_summary:{
            reviews_count:324,
            average_ratings:3.4
        },
        images:{
            red : [
                {
                    image_details: "front image",
                    color:"red",
                    size:"xl",
                    url: jordan4_1,
                },
                {
                    image_details: "front 2  image",
                    color:"red",
                    size:"xl",
                    url: jordan4_2,
                },
                {
                    image_details: "side image",
                    color:"red",
                    size:"xl",
                    url: jordan4_3,
                },
                {
                    image_details: "side 2 image",
                    color:"red",
                    size:"xl",
                    url: jordan4_4,
                },
                {
                    image_details: "back image",
                    color:"red",
                    size:"xl",
                    url: jordan4_5,
                }
            ],
            blue : [
                {
                    image_details: "front image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_10,
                },
                {
                    image_details: "front 2  image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_11,
                },
                {
                    image_details: "side image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_12,
                },
                {
                    image_details: "side 2 image",
                    color:"blue",
                    size:"xl",
                    url: jordan4_13,
                },
            ],
            green : [
                {
                    image_details: "front image",
                    color:"green",
                    size:"xl",
                    url: jordan4_6,
                },
                {
                    image_details: "front 2  image",
                    color:"green",
                    size:"xl",
                    url: jordan4_7,
                },
                {
                    image_details: "side image",
                    color:"green",
                    size:"xl",
                    url: jordan4_8,
                },
                {
                    image_details: "side 2 image",
                    color:"green",
                    size:"xl",
                    url: jordan4_9,
                },
            ]
        }
    }
]

export const REVIEWS = [
    {
        id:5,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            Hoody,
            Hoody,
            Hoody2,
            Hoody2
        ],
        user_height:'190cm',
        user_weight:'38kg',
        helpful_count:29,
        created_at:"2033-09-09"
    },
    {
        id:4,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        images:[
            Hoody,
            Hoody,
            Hoody2
        ],
   
        helpful_count:40,
        created_at:"2033-09-09",
        user_height:'190cm',
        user_weight:'38kg',
    },
    {
        id:2,
        username:"Sam s",
        rating:3.5,
        color:"red",
        size:"xl",
        title:"amazing fit from hard working slaves",
        text:` the quality is bad and cheap ,clothes do not fit  ,
               customer service sucks (one of them cursed me),
               and they hire black people , 0 out of 10 (for hiring black people)`,
        user_height:'190cm',
        user_weight:'38kg',
        helpful_count:0,
        created_at:"2033-09-09"
    }
]
export const PRODUCT  = {
    pk :1,
    name:'nike jordan 4',
    quantity:444,
    reviews_summary : {
        average_ratings : 4.5,
        reviews_count : 203,
    },
    price:304,
    type:"men's shoes",
    colors:['red', 'blue', 'green'],
    sizes:['W 5 / M 6.5', 'W 6 / M 8.5', 'W 10.5 / M 9','W 12.5 / M 14', 'W 17.5 / M 19'],
    sizes_table: {
        units : ['Women/Men', 'inches','millimters'],
        sizes :[
            ['W 5 / M 6.5','4.3','143'],
            ['W 6 / M 8.5','3.3','324'],
        ]
    },
    added_at: "2022-03-18T11:40:22.519222Z",
    description:
                `gold glasses made with water lava and fabric shit by black slaves and kids beaten just before death.
                . right material used 
                . right slaves chosen
                . ensured the kids were starved
                . donald trump for presidency`,
    category : "casual",
    sale : {
        price_after_sale:200,
        percentage:32,
        starts_at:"2022-05-18T11:40:22.519222Z",
        ends_at:"2024-05-18T11:40:22.519222Z",
    },
    images:{
        red : [
            {
                image_details: "front image",
                color:"red",
                size:"xl",
                url: jordan4_1,
            },
            {
                image_details: "front 2  image",
                color:"red",
                size:"xl",
                url: jordan4_2,
            },
            {
                image_details: "side image",
                color:"red",
                size:"xl",
                url: jordan4_3,
            },
            {
                image_details: "side 2 image",
                color:"red",
                size:"xl",
                url: jordan4_4,
            },
            {
                image_details: "back image",
                color:"red",
                size:"xl",
                url: jordan4_5,
            }
        ],
        blue : [
            {
                image_details: "front image",
                color:"blue",
                size:"xl",
                url: jordan4_10,
            },
            {
                image_details: "front 2  image",
                color:"blue",
                size:"xl",
                url: jordan4_11,
            },
            {
                image_details: "side image",
                color:"blue",
                size:"xl",
                url: jordan4_12,
            },
            {
                image_details: "side 2 image",
                color:"blue",
                size:"xl",
                url: jordan4_13,
            },
        ],
        green : [
            {
                image_details: "front image",
                color:"green",
                size:"xl",
                url: jordan4_6,
            },
            {
                image_details: "front 2  image",
                color:"green",
                size:"xl",
                url: jordan4_7,
            },
            {
                image_details: "side image",
                color:"green",
                size:"xl",
                url: jordan4_8,
            },
            {
                image_details: "side 2 image",
                color:"green",
                size:"xl",
                url: jordan4_9,
            },
        ]
    }
}

export const ORDERS = [
    {
        id : 1,
        created_at:"2023-10-10", 
        status:'paid',
        total_cost:1000, 
        canceled_at:null,
        shipping_state : "shipping in 4 days",
        recipiant_name:"abbass ashmar",
        products:[
            {
                id:1,
                thumbnail:Hoody,
                name:'shoes ultra shit',
                ordered_quantity:2,
                return_cancellation_info:"return available till 2/2/2022" // calculated
            },
            {
                id:1,
                thumbnail:Hoody2,
                name:'some shoe made by utilizing child labor and it sucks ultra shit',
                ordered_quantity:2,
                return_cancellation_info:"return available till 2/2/2022" // calculated
            }
        ]
    },
    {
        id : 2,
        created_at:"2023/10/10", 
        status:'delivered',
        total_cost:1000, 
        canceled_at:null,
        shipping_state : "Delivered since 9/11/2001",
        recipiant_name:"mahmood lsoory",
        products:[
            {
                id:1,
                thumbnail:Hoody,
                name:'shoes ultra shit fake name goes wild i hate black people',
                ordered_quantity:2,
                return_cancellation_info:"return available till 9/4/2022" // calculated
            },
            
        ]
    },
    
]