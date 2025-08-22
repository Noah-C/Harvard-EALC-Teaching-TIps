import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarksState {
  bookmarkedIds: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
}

const useBookmarks = create<BookmarksState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      
      isBookmarked: (id: string) => {
        return get().bookmarkedIds.includes(id);
      },
      
      toggleBookmark: (id: string) => {
        set((state) => {
          const isCurrentlyBookmarked = state.bookmarkedIds.includes(id);
          
          if (isCurrentlyBookmarked) {
            // Remove from bookmarks
            return {
              bookmarkedIds: state.bookmarkedIds.filter(bookmarkId => bookmarkId !== id)
            };
          } else {
            // Add to bookmarks
            return {
              bookmarkedIds: [...state.bookmarkedIds, id]
            };
          }
        });
      }
    }),
    {
      name: 'heac-bookmarks',
    }
  )
);

export default useBookmarks; 