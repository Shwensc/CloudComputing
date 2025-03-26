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
    // Series Data
    const seriesList = [
        { id: 1, title: "House M.D.", description: "An antisocial doctor solves medical mysteries.", image: houseImg },
        { id: 2, title: "Dahmer", description: "A chilling true-crime series about Jeffrey Dahmer.", image: dahmerImg },
        { id: 3, title: "Dexter", description: "A forensic expert with a dark secret: he's a serial killer.", image: dexterImg }
    ];

    // Function to handle adding a series
    const handleAddSeries = async (series) => {
        try {
            const response = await fetch('http://localhost:5000/addSeries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(series)
            });

            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error adding series:", error);
            alert("Failed to add series.");
        }
    };

    // Function to handle updating a series
    const handleUpdateSeries = async (series) => {
        try {
            const response = await fetch(`http://localhost:5000/updateSeries/${series.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(series)
            });

            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error updating series:", error);
            alert("Failed to update series.");
        }
    };

    // Function to handle deleting a series
    const handleDeleteSeries = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteSeries/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            alert(data.message); // Show success or error message
        } catch (error) {
            console.error("Error deleting series:", error);
            alert("Failed to delete series.");
        }
    };

    const [hoveredCardId, setHoveredCardId] = React.useState(null);

    return (
        <>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {seriesList.map((series) => (
                    <Card
                        key={series.id}
                        sx={{
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
                            },
                            opacity: hoveredCardId === null || hoveredCardId === series.id ? 1 : 0.2,
                            transition: 'opacity 0.3s ease'
                        }}
                        onMouseEnter={() => setHoveredCardId(series.id)}
                        onMouseLeave={() => setHoveredCardId(null)}
                    >
                        <CardMedia component="img" alt={series.title} height="140" image={series.image} />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {series.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {series.description}
                            </Typography>
                        </CardContent>

                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: 'darkgreen' } }}
                                onClick={() => handleAddSeries(series)}>
                                Add Series
                            </Button>
                            <Button sx={{ backgroundColor: 'blue', color: 'white', '&:hover': { backgroundColor: 'darkblue' } }}
                                onClick={() => handleUpdateSeries(series)}>
                                Update Series
                            </Button>
                            <Button sx={{ backgroundColor: 'yellow', color: 'black', '&:hover': { backgroundColor: 'gold' } }}
                                onClick={() => handleDeleteSeries(series.id)}>
                                Delete Series
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    );
}
