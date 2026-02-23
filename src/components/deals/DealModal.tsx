"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { DealCardData } from "@/types/deal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PriceDisplay } from "./PriceDisplay";
import { DealBadge } from "./DealBadge";
import { DealActions } from "./DealActions";
import { formatPricePEN, formatPriceUSD, isNewDeal, timeAgo } from "@/lib/utils";
import { ExternalLink, Copy, Share2, ShoppingCart, Send } from "lucide-react";
import { trackClick } from "@/lib/clicks";
import { getComments, addComment, DealComment } from "@/lib/comments";
import { getUser } from "@/lib/auth";
import { SignUpDialog } from "@/components/auth/SignUpDialog";

interface DealModalProps {
  deal: DealCardData | null;
  open: boolean;
  onClose: () => void;
}

function CommentTimeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora";
  if (mins < 60) return `Hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
}

export function DealModal({ deal, open, onClose }: DealModalProps) {
  const [comments, setComments] = useState<DealComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (deal) {
      setComments(getComments(deal.id));
    }
  }, [deal]);

  if (!deal) return null;

  const isNew = isNewDeal(deal.createdAt);
  const currentImage = deal.imageUrl;

  const handleVerDeal = () => {
    trackClick(deal.id);
    window.open(`/go/${deal.id}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deal.productUrl);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: deal.title,
        text: `${deal.title} - ${formatPricePEN(deal.priceLocal)}`,
        url: deal.productUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  const handleAddComment = () => {
    if (!getUser()) {
      setShowSignUp(true);
      return;
    }
    if (!newComment.trim()) return;
    addComment(deal.id, newComment.trim());
    setComments(getComments(deal.id));
    setNewComment("");
  };

  const refreshComments = () => {
    setComments(getComments(deal.id));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-6xl overflow-y-auto border-border bg-card p-0">
          <DialogTitle className="sr-only">{deal.title}</DialogTitle>

          {/* Horizontal layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image section */}
            <div className="flex shrink-0 items-center justify-center bg-white lg:w-[420px]">
              {/* Main image - centered */}
              <div className="relative aspect-square w-full">
                {currentImage ? (
                  <Image
                    src={currentImage}
                    alt={deal.title}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 95vw, 420px"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                    Sin imagen
                  </div>
                )}
              </div>
            </div>

            {/* Right: Info section */}
            <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {isNew && <DealBadge type="new" />}
                <DealBadge type="hot" />
                <Badge variant="secondary" className="text-xs">
                  {deal.category}
                </Badge>
              </div>

              {/* Price - prominent */}
              <PriceDisplay
                priceLocal={deal.priceLocal}
                priceUsd={deal.priceUsd}
                size="lg"
              />

              {/* Title */}
              <h2 className="text-base font-bold leading-snug text-foreground lg:text-lg">
                {deal.title}
              </h2>

              {/* Likes + comments + share bar */}
              <DealActions dealId={deal.id} onCommentClick={() => {
                document.getElementById("deal-comment-input")?.focus();
              }} />

              {/* Price table */}
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precio</span>
                    <span className="font-medium">{formatPricePEN(deal.priceLocal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="font-medium text-deal-green">Incluido</span>
                  </div>
                  <div className="border-t border-border pt-1.5">
                    <div className="flex justify-between font-semibold">
                      <span>Precio Final</span>
                      <span className="text-deal-blue">{formatPricePEN(deal.priceLocal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare with Amazon */}
              <div className="rounded-lg border border-border p-3">
                <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
                  Comparar precio
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Amazon</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatPriceUSD(deal.priceUsd)} USD
                  </span>
                </div>
              </div>

              {/* Store + date */}
              <div className="text-xs text-muted-foreground">
                Unaluka.com &middot; {timeAgo(deal.createdAt)}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <Button
                  className="flex-1 bg-deal-red text-white hover:bg-deal-red-hover"
                  size="lg"
                  onClick={handleVerDeal}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver Deal
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {/* Comments section */}
              <div className="border-t border-border pt-3">
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  Comentarios ({comments.length})
                </h4>

                {/* Comment input */}
                <div className="mb-3 flex gap-2">
                  <Input
                    id="deal-comment-input"
                    placeholder={getUser() ? "Escribe un comentario..." : "Registrate para comentar"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleAddComment(); }}
                    className="text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleAddComment}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Comments list */}
                {comments.length > 0 ? (
                  <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
                    {comments.map((c, i) => (
                      <div key={i} className="rounded-md bg-muted/30 p-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-medium text-foreground">{c.userName}</span>
                          <span className="text-muted-foreground">{CommentTimeAgo(c.date)}</span>
                        </div>
                        <p className="mt-1 text-sm text-foreground">{c.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Sin comentarios aun. Se el primero!
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SignUpDialog
        open={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSuccess={refreshComments}
      />
    </>
  );
}
