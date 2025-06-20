
const Page = async ({params}: SearchParamProps) => {

    const type = (await params)?.type as string || ""

    return(
        <div>
           {type}
        </div>
    )
}


export default Page;