import { AppTheme } from '@/src/components/themes/AppTheme';
import { FormInput } from '@/src/components/ui/FormInput';
import { useKeywordFilter } from '@/src/hooks/rituals/useKeywordFilter';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Keyboard, Pressable, TextInput } from 'react-native';

interface RitualSearchInputProps {
  onSearch: (query: string) => void;
}

export default function RitualSearchInput({
  onSearch,
}: RitualSearchInputProps) {
  const { keyword, setKeyword, clearKeyword, hasKeyword } = useKeywordFilter();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setQuery(keyword);
  }, [keyword]);

  const handleSearch = () => {
    Keyboard.dismiss();
    setKeyword(query);
    onSearch(query);
  };

  return (
    <FormInput
      ref={inputRef}
      placeholder="Search rituals…"
      value={query}
      onChangeText={setQuery}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      autoCorrect={false}
      autoCapitalize="none"
      returnKeyType="search"
      onSubmitEditing={handleSearch}
      containerClassName={clsx('flex-1', isFocused && 'border-brand-primary')}
      rightElement={
        query ? (
          <Pressable
            onPress={() => {
              setQuery('');
              clearKeyword();
              inputRef.current?.focus();
            }}
            hitSlop={8}
          >
            <MaterialIcons name="close" size={18} color={AppTheme.colors.text.muted} />
          </Pressable>
        ) : (
          <MaterialIcons name="search" size={18} color={AppTheme.colors.text.muted} />
        )
      }
    />
  );
}
