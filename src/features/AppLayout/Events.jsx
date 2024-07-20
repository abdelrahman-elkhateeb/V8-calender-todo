function Events() {
  const inputClassName = `shadow-lineShadow p-4 rounded-md  focus:outline-primary`;
  return (
    <>
      <p className="flex h-full w-full items-center justify-center text-3xl font-semibold capitalize text-primary">
        select a day
      </p>
      <div className="hidden">
        <h1 className="mt-5 text-5xl font-bold italic text-primary">
          Enter new Event
        </h1>
        <form className="flex h-full flex-col justify-evenly">
          <input
            type="text"
            name="name"
            placeholder="Event Name / ex:quiz"
            className={inputClassName}
          />

          <input
            type="text"
            name="slot"
            placeholder="Slot / ex:5th"
            className={inputClassName}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject ex:mobile / dev"
            className={inputClassName}
          />

          <input
            type="text"
            name="location"
            placeholder="Location / ex:s2"
            className={inputClassName}
          />

          <input
            type="text"
            name="content"
            placeholder="Content Lecture / ex:1,2,3"
            className={inputClassName}
          />
          <button className="rounded-md bg-primary p-3 text-background">
            add Event
          </button>
        </form>
      </div>
    </>
  );
}

export default Events;
