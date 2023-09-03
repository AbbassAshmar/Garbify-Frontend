
export const Categories = [

    // [{men , parents[] }, {clothes , parents:[men]} ]
    {
        "name": "men",
        "children": [
            {
                "name": "clothes",
                "children": []
            },
            {
                "name": "shoe",
                "children": [
                    {
                        "name": "suit shoe",
                        "children": []
                    },
                    {
                        "name": "running",
                        "children": [
                            {
                                "name": "pitch",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "name": "women",
        "children": [
            {
                "name": "shoes",
                "children": [
                    {
                        "name": "running",
                        "children": []
                    }
                ]
            },
            {
                "name": "clothes",
                "children": [
                    {
                        "name": "pitch",
                        "children": []
                    },
                    {
                        "name": "dresses",
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "sales",
        "children": [
            {
                "name": "men",
                "children": 
                    [
                        {
                            "name": "clothes"
                        },
                        {
                            "name": "shoe"
                        }
                    ]
                
            },
            {
                "name": "women",
                "children": 
                    [
                        {
                            "name": "shoes"
                        },
                        {
                            "name": "clothes"
                        }
                    ]
                
            }
        ]
    },
    {
        "name": "new arrivals",
        "children": [
            {
                "name": "men",
                "children": 
                    [
                        {
                            "name": "clothes"
                        },
                        {
                            "name": "shoe"
                        }
                    ]
                
            },
            {
                "name": "women",
                "children": 
                    [
                        {
                            "name": "shoes"
                        },
                        {
                            "name": "clothes"
                        }
                    ]
                
            }
        ]
    }
]             