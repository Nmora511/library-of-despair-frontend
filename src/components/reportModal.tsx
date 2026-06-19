import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdReport } from "react-icons/md";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import ToolTip from "./toolTip";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import api from "@/utils/api";
import { ReportedIssue } from "@/types/apiTypes";
import { toast } from "react-toastify";

interface ReportModalProps {
  lineNumber: number;
  episodeId: string;
}

const MotionAttentionIcon = motion.create(MdReport);

export default function ReportModal({
  lineNumber,
  episodeId,
}: ReportModalProps) {
  const [reportSuggestion, setReportSuggestion] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();

    if (!reportSuggestion.trim()) return;

    setIsLoading(true);
    try {
      const payload: ReportedIssue = {
        episodeId: episodeId,
        lineNumber: lineNumber,
        suggestion: reportSuggestion,
      };
      const result = await api.post("/issue", payload);

      if (result.status == 200) {
        setIsOpen(false);
        toast.success("Sugestão enviada com sucesso!");
        console.log("sucesso");
      }
    } catch (error) {
      toast.error("Erro ao enviar sugestão, Tente novamente mais tarde!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <ToolTip tooltipText="Reportar">
            <MotionAttentionIcon
              size="1.5rem"
              whileHover={{ scale: 1.3 }}
              className="cursor-pointer mx-2"
            />
          </ToolTip>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm bg-background border-(--modal-primary) border shadow-[0_0_50px_rgba(214,107,0,0.75)]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-bold text-(--modal-primary)">
              Reportar Falha na Transcrição
            </DialogTitle>
            <DialogDescription>
              Reporte uma falha na transcrição do áudio.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="name-1" className="font-bold">
            Sugestão
          </Label>
          <Input
            value={reportSuggestion}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setReportSuggestion(e.target.value)
            }
            type="text"
            placeholder="Digite sua sugestão aqui"
            className="outline-(--modal-primary)"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isLoading}
                className="cursor-pointer"
                variant="outline"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isLoading}
              className="cursor-pointer bg-(--modal-primary) hover:bg-(--dark-modal-primary)"
              variant="secondary"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center gap-1 h-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                </div>
              ) : (
                "Enviar Sugestão"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
