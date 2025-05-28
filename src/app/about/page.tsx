export default function About() {
    return (
        <div className="flex px-20">
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Debitis doloribus consectetur voluptates nihil autem repellendus
                atque, corporis facilis reprehenderit, modi recusandae suscipit,
                sit hic dolorum quos error quidem nemo ipsa.
            </p>
            // IMage
            <img
                src="https://images.unsplash.com/photo-1677631950982-0f1a3b5c4d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                alt="About"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <span></span>
        </div>
    );
}
