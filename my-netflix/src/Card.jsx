import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dahmerImg from './assets/dahmer.jpg';
import dexterImg from './assets/dexter.jpg';
import houseImg from './assets/house.jpg';

export default function ImgMediaCard() {
    const [seriesList, setSeriesList] = React.useState([
        { id: 1, title: "House M.D.", description: "An antisocial doctor solves medical mysteries.", image: houseImg },
        { id: 2, title: "Dahmer", description: "A chilling true-crime series about Jeffrey Dahmer.", image: dahmerImg },
        { id: 3, title: "Dexter", description: "A forensic expert with a dark secret: he's a serial killer.", image: dexterImg }
    ]);

    const [hoveredCardId, setHoveredCardId] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedSeries, setSelectedSeries] = React.useState(null);
    const [newDescription, setNewDescription] = React.useState("");

    const handleOpenDialog = (series) => {
        setSelectedSeries(series);
        setNewDescription(series.description);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleUpdateSeries = async () => {
        if (!selectedSeries) return;
        try {
            const updatedSeries = { ...selectedSeries, description: newDescription };
            const response = await fetch(`http://localhost:5000/updateSeries/${selectedSeries.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSeries)
            });
            const data = await response.json();
            alert(data.message);
            
            setSeriesList(seriesList.map(s => s.id === selectedSeries.id ? updatedSeries : s));
            handleCloseDialog();
        } catch (error) {
            console.error("Error updating series:", error);
            alert("Failed to update series.");
        }
    };

    const handleAddSeries = async (series) => {
        try {
            const response = await fetch('http://localhost:5000/addSeries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(series)
            });
            const data = await response.json();
            alert(data.message);
            setSeriesList([...seriesList, series]);
        } catch (error) {
            console.error("Error adding series:", error);
            alert("Failed to add series.");
        }
    };

    const handleDeleteSeries = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteSeries/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            alert(data.message);
            setSeriesList(seriesList.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error deleting series:", error);
            alert("Failed to delete series.");
        }
    };

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
                                onClick={() => handleOpenDialog(series)}>
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

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Update Description</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Description"
                        fullWidth
                        variant="outlined"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleUpdateSeries}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
