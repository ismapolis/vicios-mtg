import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { fetchCommanders } from "../../hooks/fetchCommanders";

interface CommanderOption {
  name: string;
}

interface CommanderSearchProps {
  value: string;
  onChange: (value: string) => void;
  recent: string[]; // 🔑 recibidos de RegisterMatch
  onRecentUpdate: (val: string) => void; // 🔑 callback para actualizar
}

export const CACHE_KEY = "recent-commanders";

export default function CommanderSearch({
  value,
  onChange,
  recent,
  onRecentUpdate,
}: CommanderSearchProps) {
  const [options, setOptions] = useState<CommanderOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (val: CommanderOption | null) => {
    if (!val) return;
    onChange(val.name);
    onRecentUpdate(val.name); // 🔑 ya no guarda local, lo delega
  };

  const fetchAndSetCommanders = async (query: string) => {
    if (!query) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const commanderNames = await fetchCommanders(query);
      setOptions(commanderNames);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar búsqueda con debounce simple
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchAndSetCommanders(inputValue.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  // Si hay texto → mostrar opciones; si no → recientes
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
      filterOptions={(x) => x} // No aplicar filtro extra de MUI
      onInputChange={(_, newInput) => setInputValue(newInput)}
      loading={loading}
      noOptionsText={
        inputValue ? "No commanders found" : "Type to search commanders"
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Commander"
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
