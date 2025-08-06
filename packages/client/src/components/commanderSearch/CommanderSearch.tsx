import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface CommanderOption {
  name: string;
}

interface CommanderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const CACHE_KEY = "recent-commanders";

export default function CommanderSearch({
  value,
  onChange,
}: CommanderSearchProps) {
  const [options, setOptions] = useState<CommanderOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("Loaded recent commanders from cache:", parsed);
      setRecent(parsed);
    }
  }, []);

  const handleSelect = (val: CommanderOption | null) => {
    if (!val) return;
    onChange(val.name);

    const updated = [val.name, ...recent.filter((c) => c !== val.name)].slice(
      0,
      5
    );
    console.log("Updated recent commanders:", updated);
    setRecent(updated);
    localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
  };

  const fetchCommanders = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=is:commander+${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      if (data?.data) {
        const commanderNames = data.data.map((c: any) => ({ name: c.name }));
        setOptions(commanderNames);
      } else {
        setOptions([]);
      }
    } catch (err) {
      console.error("Error fetching commanders:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar búsqueda cuando cambia inputValue con debounce simple
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCommanders(inputValue.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Cuando hay texto, mostrar opciones; si no, mostrar recientes
  const combinedOptions = inputValue.trim()
    ? options
    : recent.map((name) => ({ name }));

  return (
    <Autocomplete
      fullWidth
      size="small"
      value={value ? { name: value } : null}
      onChange={(_, newValue) => handleSelect(newValue)}
      options={combinedOptions}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, val) => option.name === val.name}
      filterOptions={(x) => x} // Sin filtro extra de MUI
      onInputChange={(_, newInput) => setInputValue(newInput)}
      loading={loading}
      noOptionsText={
        inputValue ? "No commanders found" : "Type to search commanders"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search commander"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
