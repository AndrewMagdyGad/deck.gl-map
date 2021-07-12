import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Input, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPolygonById, searchPolygons } from "../Slices/polygonSlice";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: "0.15rem",
            marginBottom: "0.15rem",
        },
        grid: {
            width: "100%",
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            minWidth: "100%",
        },
        paper: {
            textAlign: "center",
            padding: "5px",
        },
    })
);

export default function SearchAndFilter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [menu, setMenu] = useState<Array<{ id: string; name: string }>>([]);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        (async () => {
            const response: { data: Array<{ id: string; name: string }> } =
                await axios.get(
                    `${process.env.REACT_APP_API_BASEURL}/polygon/get-menu`
                );
            setMenu([...response.data]);
        })();
    }, []);

    const handleSelect = (e: any) => {
        setSearch("");
        setSelectedItem(e.target.value);
        dispatch(fetchPolygonById(e.target.value));
    };

    const handleSearch = () => {
        if (search.trim().length > 0) {
            setSelectedItem("");
            dispatch(searchPolygons(search));
        }
    };

    return (
        <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            className={classes.root}
        >
            <Grid item md={4} sm={12} className={classes.grid}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="select-polygon">Select Polygon</InputLabel>
                    <Select
                        labelId="select-polygon"
                        id="select-polygon"
                        value={selectedItem}
                        onChange={handleSelect}
                        label="Select Polygon"
                    >
                        {menu.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={4} sm={12} className={classes.grid}>
                <Paper className={classes.paper}>
                    <Input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        placeholder="Search region or zone"
                        inputProps={{ "aria-label": "Search region or zone" }}
                    />
                    <IconButton
                        type="submit"
                        aria-label="search"
                        onClick={handleSearch}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    );
}
