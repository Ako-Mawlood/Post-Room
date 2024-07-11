import Sheet from "../Components/pages/write/Sheet"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/app/Components/ui/tabs"

const WritePage = () => {
  return (
    <>
      <div className="w-8/12 mx-auto mt-10">
        <Tabs defaultValue="write">
          <TabsList className="bg-transparent">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="write">
            <Sheet />
          </TabsContent>
          <TabsContent value="preview">content</TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default WritePage
