// import React, { useState, useRef, useEffect } from 'react';
// import { Upload, Type, Palette, Undo, Redo } from 'lucide-react';

const CanvaImageEditor = () => {
//   const [image, setImage] = useState(null);
//   const [layers, setLayers] = useState([]);
//   const [selectedLayer, setSelectedLayer] = useState(null);

//   // Enhanced text placement configuration
//   const createTextLayers = (suggestions, backgroundImage) => {
//     // Dynamic font sizing based on image dimensions
//     const getResponsiveFontSize = (baseSize, imageWidth) => {
//       const scaleFactor = imageWidth / 1200; // Reference width
//       return Math.round(baseSize * scaleFactor);
//     };

//     // Determine text colors with better contrast
//     const determineTextColor = (brightness) => {
//       return brightness > 128 ? 'text-black' : 'text-white';
//     };

//     // Positioning strategies
//     const positionText = (imageWidth, imageHeight, position) => {
//       const margins = {
//         header: { 
//           x: imageWidth * 0.05, 
//           y: imageHeight * 0.1 
//         },
//         mainText: { 
//           x: imageWidth * 0.05, 
//           y: imageHeight * 0.4 
//         },
//         cta: { 
//           x: imageWidth * 0.05, 
//           y: imageHeight * 0.8 
//         }
//       };

//       return margins[position];
//     };

//     // Font selection with professional hierarchy
//     const fonts = [
//       'font-sans', 
//       'font-serif', 
//       'font-mono'
//     ];

//     return [
//       {
//         id: 'header-text',
//         type: 'text',
//         text: suggestions.header || 'Discover Your Potential',
//         fontSize: `text-${getResponsiveFontSize(4, backgroundImage.width)}xl`,
//         fontFamily: fonts[0],
//         color: 'text-white',
//         className: 'font-bold drop-shadow-lg bg-black/40 p-3 rounded-lg',
//         ...positionText(backgroundImage.width, backgroundImage.height, 'header')
//       },
//       {
//         id: 'main-text',
//         type: 'text',
//         text: suggestions.mainText || 'Transform Your Experience',
//         fontSize: `text-${getResponsiveFontSize(6, backgroundImage.width)}xl`,
//         fontFamily: fonts[1],
//         color: 'text-white',
//         className: 'font-extrabold drop-shadow-xl bg-black/50 p-4 rounded-xl',
//         ...positionText(backgroundImage.width, backgroundImage.height, 'mainText')
//       },
//       {
//         id: 'cta-text',
//         type: 'text',
//         text: suggestions.cta || 'Get Started Now',
//         fontSize: `text-${getResponsiveFontSize(3, backgroundImage.width)}xl`,
//         fontFamily: fonts[2],
//         color: 'text-white',
//         className: 'font-bold bg-blue-600 hover:bg-blue-700 transition-colors p-2 rounded-md',
//         ...positionText(backgroundImage.width, backgroundImage.height, 'cta')
//       }
//     ];
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const img = new Image();
//         img.src = e.target.result;
//         img.onload = () => {
//           // Create image layer
//           const newLayer = {
//             id: 'background-image',
//             type: 'image',
//             src: e.target.result,
//             width: img.width,
//             height: img.height
//           };

//           // Simulate Gemini suggestions
//           const mockSuggestions = {
//             header: 'Discover Your Next Adventure',
//             mainText: 'Unleash Limitless Possibilities',
//             cta: 'Explore Now'
//           };

//           // Add text layers based on suggestions
//           const textLayers = createTextLayers(mockSuggestions, img);

//           setLayers([
//             newLayer, 
//             ...textLayers
//           ]);
//         };
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const renderLayer = (layer) => {
//     if (layer.type === 'image') {
//       return (
//         <img 
//           key={layer.id}
//           src={layer.src} 
//           alt="Uploaded Background" 
//           className="absolute top-0 left-0 w-full h-full object-cover"
//         />
//       );
//     }

//     if (layer.type === 'text') {
//       return (
//         <div 
//           key={layer.id}
//           className={`absolute ${layer.color} ${layer.fontSize} ${layer.fontFamily} ${layer.className}`}
//           style={{ 
//             left: `${layer.x}px`, 
//             top: `${layer.y}px`,
//             maxWidth: '80%' // Prevent text overflow
//           }}
//         >
//           {layer.text}
//         </div>
//       );
//     }

//     return null;
//   };

//   // Rest of the component remains similar to previous implementation
//   const fileInputRef = useRef(null);

//   const tools = [
//     { 
//       icon: Upload, 
//       name: 'Upload', 
//       action: () => fileInputRef.current.click() 
//     },
//     { 
//       icon: Type, 
//       name: 'Text', 
//       action: () => {} 
//     }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-20 bg-white border-r flex flex-col items-center py-4">
//         <input 
//           type="file" 
//           ref={fileInputRef} 
//           className="hidden" 
//           accept="image/*" 
//           onChange={handleImageUpload}
//         />
//         {tools.map((tool, index) => (
//           <button
//             key={index}
//             onClick={tool.action}
//             className="p-3 hover:bg-gray-100 rounded-lg mb-2"
//           >
//             <tool.icon strokeWidth={1.5} size={24} />
//             <p className="text-xs mt-1">{tool.name}</p>
//           </button>
//         ))}
//       </div>

//       {/* Canvas Area */}
//       <div className="flex-1 relative">
//         <div className="w-full h-full relative">
//           {layers.map(renderLayer)}
//         </div>
//       </div>
//     </div>
//   );
};

export default CanvaImageEditor;













