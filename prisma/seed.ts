import prisma from "@/lib/prisma";
async function main(){
      await prisma.booking.deleteMany();
  await prisma.slot.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.promoCode.deleteMany();
    const promoCodes = await prisma.promoCode.createMany({
    data: [
      {
        code: 'WELCOME10',
        discountType: 'percentage',
        discountValue: 10,
        isActive: true,
      },
      {
        code: 'FLAT100',
        discountType: 'fixed',
        discountValue: 100,
        isActive: true,
      },
    ],
  });
   console.log(' Promo codes created');

   const experiences = await prisma.experience.createMany({
    data: [
      {
        title: 'Desert Safari',
        description: 'Experience the thrill of dune bashing and camel rides in the Arabian desert.',
        location: 'Dubai',
        price: 150,
        rating: 4.8,
        reviewCount: 120,
        image: './Desert.jpg',
        category: 'Adventure',
        duration: '5 hours',
        highlights: ['Dune bashing', 'Camel ride', 'BBQ dinner'],
        included: ['Transport', 'Dinner', 'Drinks'],
      },
      {
        title: 'Scuba Diving',
        description: 'Dive into the crystal-clear waters and explore marine life like never before.',
        location: 'Bali',
        price: 200,
        rating: 4.7,
        reviewCount: 90,
        image: './Scuba.jpg',
        category: 'Water Sports',
        duration: '3 hours',
        highlights: ['Coral reefs', 'Professional guides'],
        included: ['Equipment', 'Safety briefing'],
      },{
    title: 'Kayaking Adventure',
    description: 'Paddle through serene backwaters surrounded by lush greenery and wildlife.',
    location: 'Kerala',
    price: 120,
    rating: 4.6,
    reviewCount: 75,
    image: './Kayaking.jpg',
    category: 'Water Sports',
    duration: '2 hours',
    highlights: ['Peaceful lagoons', 'Wildlife spotting'],
    included: ['Kayak', 'Life jacket', 'Guide'],
  },
  {
    title: 'Nandi Hills Sunrise Trek',
    description: 'Witness a breathtaking sunrise from the top of Nandi Hills with a refreshing morning trek.',
    location: 'Bangalore',
    price: 80,
    rating: 4.8,
    reviewCount: 110,
    image: './Nandi.jpg',
    category: 'Trekking & Nature',
    duration: '4 hours',
    highlights: ['Sunrise viewpoint', 'Panoramic landscape'],
    included: ['Guide', 'Snacks', 'Transportation from base point'],
  },
  {
    title: 'Coffee Trail Experience',
    description: 'Walk through aromatic coffee plantations and learn the art of brewing fresh coffee.',
    location: 'Coorg',
    price: 150,
    rating: 4.9,
    reviewCount: 130,
    image: './Coffee.jpg',
    category: 'Cultural & Nature',
    duration: '3 hours',
    highlights: ['Coffee tasting', 'Plantation walk'],
    included: ['Local guide', 'Coffee samples', 'Snacks'],
  },
  {
    title: 'Paragliding Thrill',
    description: 'Soar high above the hills and experience the ultimate adrenaline rush.',
    location: 'Bir Billing',
    price: 250,
    rating: 4.8,
    reviewCount: 200,
    image: './Paragliding.jpg',
    category: 'Adventure Sports',
    duration: '1 hour',
    highlights: ['Aerial view', 'Professional pilots'],
    included: ['Safety gear', 'Instructor', 'Transport to take-off point'],
  },

  {
    title: 'White Water Rafting',
    description: 'Challenge the rapids and experience the thrill of white-water rafting.',
    location: 'Rishikesh',
    price: 170,
    rating: 4.9,
    reviewCount: 220,
    image: './Rafting.jpg',
    category: 'Water Sports',
    duration: '3 hours',
    highlights: ['Grade III & IV rapids', 'Safety-certified guides'],
    included: ['Rafting gear', 'Life jacket', 'Instructor'],
  },
  {
    title: 'Jungle Safari',
    description: 'Embark on a thrilling journey through the wild to spot exotic animals and birds.',
    location: 'Jim Corbett National Park',
    price: 140,
    rating: 4.5,
    reviewCount: 95,
    image: './JungleSafari.jpg',
    category: 'Wildlife & Nature',
    duration: '4 hours',
    highlights: ['Tiger spotting', 'Guided forest tour'],
    included: ['Jeep ride', 'Guide', 'Entry permit'],
  },
  {
    title: 'Camping by the Lake',
    description: 'Spend a peaceful night under the stars beside a tranquil lake.',
    location: 'Pawna Lake',
    price: 130,
    rating: 4.6,
    reviewCount: 85,
    image: './Camping.jpg',
    category: 'Outdoor & Nature',
    duration: 'Overnight',
    highlights: ['Bonfire', 'Stargazing'],
    included: ['Tent', 'Dinner & Breakfast', 'Music night'],
  }
    ],
  });

  console.log(' Experiences created');

   const allExperiences = await prisma.experience.findMany();

  const slotsData = [];

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  for (const exp of allExperiences) {
    slotsData.push(
      {
        experienceId: exp.id,
        date: today,
        startTime: '09:00 AM',
        endTime: '12:00 PM',
        totalSeats: 10,
        availableSeats: 10,
        price: exp.price,
      },
      {
        experienceId: exp.id,
        date: tomorrow,
        startTime: '02:00 PM',
        endTime: '05:00 PM',
        totalSeats: 8,
        availableSeats: 8,
        price: exp.price,
      }
    );
  }

  await prisma.slot.createMany({ data: slotsData });
  console.log(' Slots created');

   const firstSlot = await prisma.slot.findFirst();
  const firstExperience = await prisma.experience.findFirst();

  if (firstSlot && firstExperience) {
    await prisma.booking.create({
      data: {
        experienceId: firstExperience.id,
        slotId: firstSlot.id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        numberOfSeats: 2,
        totalPrice: firstSlot.price * 2,
        promoCode: 'WELCOME10',
        discount: 20,
        finalPrice: firstSlot.price * 2 - 20,
        status: 'confirmed',
      },
    });
    console.log('Sample booking created');
  }

  console.log(' Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });