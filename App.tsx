import React, { useState } from 'react';
import { league, categories, players, Player, BUDGET } from './data';
import { SquadProvider, useSquad } from './context/SquadContext';
import { UsersIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

function Header() {
  const { totalItems, remainingBudget } = useSquad();
  const [squadOpen, setSquadOpen] = useState(false);

  const budgetColor = remainingBudget >= 20 ? 'text-green-400' : remainingBudget >= 10 ? 'text-yellow-400' : 'text-red-400';

  return (
    <>
      <header className="sticky top-0 bg-gradient-to-br from-primary via-blue-800 to-indigo-900 text-white shadow-2xl z-40">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <h1 className="text-5xl font-black drop-shadow-2xl">{league.name}</h1>
              <p className="text-2xl mt-3 opacity-90">{league.description}</p>
              <div className="mt-6 text-3xl font-black drop-shadow-2xl">
                Remaining:{' '}
                <span className={`animate-pulse ${budgetColor}`}>
                  {remainingBudget.toFixed(1)}M 
                </span>
              </div>
            </div>
            <button
              onClick={() => setSquadOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-primary px-10 py-6 rounded-3xl shadow-2xl flex items-center gap-5 font-black text-2xl hover:scale-110 hover:shadow-yellow-500/50 transition-all"
            >
              <UsersIcon className="w-10 h-10" />
              My Squad
              {totalItems > 0 && (
                <span className="absolute -top-4 -right-4 bg-red-600 text-white text-lg rounded-full w-10 h-10 flex items-center justify-center animate-bounce shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {squadOpen && <SquadDrawer onClose={() => setSquadOpen(false)} />}
    </>
  );
}

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
  return (
    <div className="px-6 py-10 bg-gradient-to-b from-primary/30 to-transparent">
      <div className="relative max-w-4xl mx-auto">
        <MagnifyingGlassIcon className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 text-primary" />
        <input
          type="text"
          placeholder="Search players or clubs..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-24 pr-10 py-8 rounded-full text-2xl border-8 border-primary/50 focus:outline-none focus:border-yellow-400 focus:ring-12 focus:ring-yellow-400/40 transition-all shadow-2xl bg-white/95 backdrop-blur-lg"
        />
      </div>
    </div>
  );
}

function CategoryFilter({ selected, onSelect }: { selected: string; onSelect: (cat: string) => void }) {
  return (
    <div className="flex gap-6 px-6 py-8 overflow-x-auto whitespace-nowrap scrollbar-hide bg-gradient-to-r from-primary/20 to-indigo-100 shadow-xl">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-10 py-6 rounded-3xl font-black text-2xl transition-all shadow-2xl ${
            selected === cat 
              ? 'bg-gradient-to-r from-primary to-indigo-700 text-white scale-125 shadow-primary/70' 
              : 'bg-white/80 text-gray-900 hover:bg-yellow-300 hover:scale-110'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}



function PlayerCard({ player }: { player: Player }) {
  const { squad, addToSquad, totalPrice } = useSquad();
  const isAdded = squad.some(p => p.id === player.id);
  const wouldExceed = totalPrice + player.price > BUDGET;

  const positionGrad = {
    GK: 'from-green-400 to-emerald-700 bg-green-500',
    DEF: 'from-blue-400 to-indigo-700 bg-blue-500',
    MID: 'from-yellow-400 to-amber-600 bg-yellow-500',
    FWD: 'from-red-400 to-rose-700 bg-red-500',
  }[player.position];

  return (
    <div className={`relative bg-white rounded-3xl overflow-hidden hover:scale-110 transition-all duration-500 border-8 border-${positionGrad.split(' ')[2].replace('bg-', '')}-400 shadow-2xl hover:shadow-${positionGrad.split(' ')[2].replace('bg-', '')}-500/50`}>
      <div className="relative h-96">
        <img src={player.image} alt={player.name} className="w-full h-full object-cover brightness-75 saturate-150" />
        <div className={`absolute inset-0 bg-gradient-to-br ${positionGrad} opacity-80`} />
        
        {/* Position badge — now higher (top-4), smaller, colored pill, no overlap */}
        <span className={`absolute top-4 left-4 px-5 py-2 rounded-full text-lg font-black text-white shadow-xl ${positionGrad}`}>
          {player.position}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
          <h3 className="text-5xl font-black drop-shadow-2xl leading-tight">{player.name}</h3>
          <p className="text-2xl opacity-90 mt-1">{player.club}</p>
          <div className="mt-8">
            <div className="flex items-center gap-4">
              <StarIcon className="w-8 h-8 text-yellow-300 drop-shadow-2xl" />
              <span className="text-4xl font-black drop-shadow-2xl">{player.rating}</span> {/* Clean rating — no € */}
            </div>
            <span className="mt-3 text-5xl font-extrabold drop-shadow-2xl text-right">{player.price.toFixed(1)}M </span>
          </div>
        </div>
      </div>
      <div className="p-8">
        {isAdded ? (
          <div className="py-6 bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-3xl text-center font-black text-2xl shadow-2xl">
            ✓ Added!
          </div>
        ) : wouldExceed ? (
          <div className="py-6 bg-gradient-to-r from-red-500 to-rose-700 text-white rounded-3xl text-center font-black text-2xl shadow-2xl">
            Over budget!
          </div>
        ) : (
          <button
            onClick={() => addToSquad(player)}
            className={`w-full py-6 bg-gradient-to-r ${positionGrad} text-white rounded-3xl font-black text-2xl shadow-2xl hover:opacity-80 transition`}
          >
            Add to Squad
          </button>
        )}
      </div>
    </div>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const positionMap: Record<string, string> = {
    Goalkeepers: "GK",
    Defenders: "DEF",
    Midfielders: "MID",
    Forwards: "FWD",
  };

  const filteredPlayers = players.filter(player => {
    const matchesCategory = selectedCategory === 'All' || player.position === positionMap[selectedCategory];
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          player.club.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/30 via-cyan-100 to-emerald-100">
      <Header />
      <SearchBar onSearch={setSearchTerm} />
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
        {filteredPlayers.length === 0 && (
          <p className="text-center text-gray-800 py-40 text-3xl font-bold">No players found — try another search!</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <SquadProvider>
      <AppContent />
    </SquadProvider>
  );
}

export default App;