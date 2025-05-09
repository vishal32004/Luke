import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulkUpload } from "./bulk-upload";
import { ImportList } from "./import-list";
import ExternalClient from "@/components/Form/ExternalClient";
import AutoDealersForm from "@/components/Form/AutoDealers";
import ChannelPartnerForm from "@/components/Form/ChannelPartner";
import InternalEmployees from "@/components/Form/InternalEmployees";
import { memo, useCallback, useState } from "react";
const MemoizedInternalEmployees = memo(InternalEmployees);
const MemoizedExternalClient = memo(ExternalClient);
const MemoizedChannelPartnerForm = memo(ChannelPartnerForm);
const MemoizedAutoDealersForm = memo(AutoDealersForm);
const ReceptionistDialog = ({ forWho }: { forWho: number }) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("individual");
  const handleFormSubmit = useCallback(() => {
    // In a real app, this would handle the form data
    setAddDialogOpen(false);
  }, []);
  // Handler for bulk add

  const handleBulkAdd = () => {
    console.log("do something");
  };

  const handleImport = () => {
    console.log("do");
  };
  return (
    <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-slate-800 hover:bg-slate-700 shadow-sm transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add Receptionist
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Receptionist
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <Tabs
            defaultValue="individual"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
              <TabsTrigger value="import">Import from List</TabsTrigger>
            </TabsList>
            <TabsContent value="individual">
              {forWho === "internal_team" && (
                <MemoizedInternalEmployees onSubmit={handleFormSubmit} />
              )}
              {forWho === "external_client" && (
                <MemoizedExternalClient onSubmit={handleFormSubmit} />
              )}
              {forWho === "channel_partners" && (
                <MemoizedChannelPartnerForm onSubmit={handleFormSubmit} />
              )}
              {forWho === "Auto" && (
                <MemoizedAutoDealersForm onSubmit={handleFormSubmit} />
              )}
            </TabsContent>
            <TabsContent value="bulk">
              <BulkUpload
                onBulkAdd={handleBulkAdd}
                onCancel={() => setAddDialogOpen(false)}
              />
            </TabsContent>
            <TabsContent value="import">
              <ImportList
                forWho={forWho}
                onImport={handleImport}
                onCancel={() => setAddDialogOpen(false)}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ReceptionistDialog;
