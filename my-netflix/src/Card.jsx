import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dahmerImg from './assets/dahmer.jpg';
import dexterImg from './assets/dexter.jpg';
import houseImg from './assets/house.jpg';

export default function ImgMediaCard() {
    // Function to handle adding a series
    const handleAddSeries = async () => {
        try {
            const response = await fetch('http://localhost:5000/addSeries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: "House M.D.",
                    description: "An antisocial doctor solves medical mysteries.",
                    image:"hi.jpg"
                })
            });

            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error adding series:", error);
            alert("Failed to add series.");
        }
    };

    // Function to handle update a series
    const handleUpdateSeries = async () => {
        try {
            const response = await fetch('http://localhost:5000/updateSeries/3', {
                method: 'PUT', // PUT request for updating
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 3, // Replace with actual series ID
                    title: "House M.D. (Updated)",
                    description: "Updated description for House M.D.",
                    image:"hi.jpg"
                })
            });
    
            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error updating series:", error);
            alert("Failed to update series.");
        }
    };
    //Funtion to delete a series
    const handleDeleteSeries = async () => {
        try {
            const response = await fetch('http://localhost:5000/deleteSeries/1', {
                method: 'DELETE', // DELETE request for removing
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 1 // Replace with actual series ID
                })
            });
    
            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error deleting series:", error);
            alert("Failed to delete series.");
        }
    };
    

    return (
        <>
            <div style={{ display: 'flex', gap: '20px' }}> {/* using flexbox */}
                {/* House Card */}
                <Card sx={{
                    maxWidth: 345,
                    border: '2px solid transparent',
                    transition: 'border-color 0.3s ease-in-out',
                    '&:hover': {
                        borderColor: 'rgb(243, 255, 105)',
                        animation: 'shake 0.3s ease-in-out'
                    },
                    '@keyframes shake': {
                        '0%': { transform: 'translateX(0)' },
                        '25%': { transform: 'translateX(-5px)' },
                        '50%': { transform: 'translateX(5px)' },
                        '75%': { transform: 'translateX(-5px)' },
                        '100%': { transform: 'translateX(0)' }
                    }
                }}>
                    <CardMedia
                        component="img"
                        alt="series1"
                        height="140"
                        image={houseImg}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            House M.D.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Using a crack team of doctors and his wits, an antisocial maverick doctor 
                            specializing in diagnostic medicine does whatever it takes to solve puzzling 
                            cases that come his way.
                        </Typography>
                    </CardContent>

                    {/* All buttons */}
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                            sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}
                            onClick={handleAddSeries} // Add function here
                        >
                            Add Series
                        </Button>
                        <Button sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }}
                        onClick={handleUpdateSeries}>
                            Update Series
                        </Button>
                        <Button sx={{ backgroundColor: 'yellow', color: 'black', '&:hover': { backgroundColor: 'gold' } }}
                        onClick={handleDeleteSeries}>
                            Delete Series
                        </Button>
                    </CardActions>
                    
                </Card>
            </div>
        </>
    );
}
